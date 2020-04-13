const Moment = require('moment');

const { ActivityTypes } = require('botbuilder');
const { LuisRecognizer } = require('botbuilder-ai');
const { DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
const { ContactDialog, GreetingDialog, RequestDialog } = require('./dialogs');

const {
    CONTACT_DIALOG,
    GREETING_DIALOG,
    REQUEST_DIALOG,
    DIALOG_STATE_PROPERTY,
    USER_PROFILE_PROPERTY,
    CANCELORDER_INTENT,
    CONTACT_INTENT,
    // CONTINUITY_INTENT,
    // FEEDBACK_INTENT,
    GREETING_INTENT,
    // IDENTITY_INTENT,
    // MATERIAL_INTENT,
    NONE_INTENT,
    // PARTING_INTENT,
    // PRODUCTS_INTENT,
    // QUALITY_INTENT,
    // QUITTING_INTENT,
    // REGIME_INTENT,
    REQUEST_INTENT
    // STORE_INTENT
} = require('./utils');

const { messageWithCarouselOfCards } = require('./resources/buttons/capabilities');
const { ConversationData } = require('./app/models/conversationData');

// LUIS service type entry as defined in the .bot file.
const LUIS_CONFIGURATION = 'rebolobot_luis';

class ReboloBot {
    /**
     * Constructs the three pieces necessary for this bot to operate:
     * 1. StatePropertyAccessor for conversation state
     * 2. StatePropertyAccess for user state
     * 3. LUIS client
     * 4. DialogSet to handle our GreetingDialog
     *
     * @param {ConversationState} conversationState property accessor
     * @param {UserState} userState property accessor
     * @param {BotConfiguration} botConfig contents of the .bot file
     */
    constructor(conversationState, userState, botConfig) {
        if (!conversationState) throw new Error('Missing parameter.  conversationState is required');
        if (!userState) throw new Error('Missing parameter.  userState is required');
        if (!botConfig) throw new Error('Missing parameter.  botConfig is required');

        // Add the LUIS recognizer.
        const luisConfig = botConfig.findServiceByNameOrId(LUIS_CONFIGURATION);
        if (!luisConfig || !luisConfig.appId) throw new Error('Missing LUIS configuration. Please follow README.MD to create required LUIS applications.\n\n');
        const luisEndpoint = luisConfig.region && luisConfig.region.indexOf('https://') === 0 ? luisConfig.region : luisConfig.getEndpoint();
        this.luisRecognizer = new LuisRecognizer({
            applicationId: luisConfig.appId,
            endpoint: luisEndpoint,
            // CAUTION: Its better to assign and use a subscription key instead of authoring key here.
            endpointKey: luisConfig.authoringKey
        });

        // Create the property accessors for user and conversation state
        this.userProfileAccessor = userState.createProperty(USER_PROFILE_PROPERTY);
        this.dialogState = conversationState.createProperty(DIALOG_STATE_PROPERTY);

        // Create top-level dialog(s)
        this.dialogs = new DialogSet(this.dialogState);
        // Add the Greeting dialog to the set
        this.dialogs.add(new ContactDialog(CONTACT_DIALOG))
            .add(new GreetingDialog(GREETING_DIALOG))
            .add(new RequestDialog(REQUEST_DIALOG, this.userProfileAccessor));

        this.conversationState = conversationState;
        this.userState = userState;
    }

    /**
     * Driver code that does one of the following:
     * 1. Display a welcome card upon receiving ConversationUpdate activity
     * 2. Use LUIS to recognize intents for incoming user message
     * 3. Starts a dialog, based on intents recognized by LUIS
     * 4. Optionally Interruptions
     *
     * @param {Context} context turn context from the adapter
     */
    async onTurn(context) {
        // Handle Message activity type, which is the main activity type for shown within a conversational interface
        // Message activities may contain text, speech, interactive cards, and binary or unknown attachments.
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (context.activity.type === ActivityTypes.Message) {
            let dialogResult;
            // Create a dialog context
            const dc = await this.dialogs.createContext(context);

            // Perform a call to LUIS to retrieve results for the current activity message.
            const results = await this.luisRecognizer.recognize(context);
            const topIntent = LuisRecognizer.topIntent(results);

            // update user profile property with any entities captured by LUIS
            // This could be user responding with their name or city while we are in the middle of greeting dialog,
            // or user saying something like 'i'm {userName}' while we have no active multi-turn dialog.
            await this.updateUserProfile(results, context);

            // Based on LUIS topIntent, evaluate if we have an interruption
            // Interruption here refers to user looking for help/ cancel existing dialog
            const interrupted = await this.isTurnInterrupted(dc, results);

            if (!interrupted) {
                // No interruption. Continue any active dialogs.
                dialogResult = await dc.continueDialog();
            }

            // If no active dialog or no active dialog has responded,
            if (!dc.context.responded) {
                // Switch on return results from any active dialog.
                switch (dialogResult.status) {
                // dc.continueDialog() returns DialogTurnStatus.empty if there are no active dialogs
                case DialogTurnStatus.empty:
                    switch (topIntent) {
                    case CONTACT_INTENT:
                        await dc.beginDialog(CONTACT_DIALOG);
                        break;
                    case GREETING_INTENT:
                        await dc.beginDialog(GREETING_DIALOG);
                        break;
                    case REQUEST_INTENT:
                        await dc.beginDialog(REQUEST_DIALOG);
                        break;
                    case NONE_INTENT:
                    default:
                        // If chatbot does not understand
                        await dc.context.sendActivity('Eu não entendi o que você acabou de me dizer.');
                        break;
                    }
                    break;
                case DialogTurnStatus.waiting:
                    // The active dialog is waiting for a response from the user, so do nothing.
                    break;
                case DialogTurnStatus.complete:
                    // All child dialogs have ended. so do nothing.
                    break;
                default:
                    // Unrecognized status from child dialog. Cancel all dialogs and clear the conversation data.
                    await this.userProfileAccessor.set(dc.context, undefined);
                    await dc.cancelAllDialogs();
                    break;
                }
            }
        } else if (context.activity.type === ActivityTypes.ConversationUpdate) {
            // Handle ConversationUpdate activity type, which is used to indicates new members add to
            // the conversation.
            // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types

            // Do we have any new members added to the conversation?
            if (context.activity.membersAdded.length !== 0) {
                // Iterate over all new members added to the conversation
                for (var idx in context.activity.membersAdded) {
                    // Greet anyone that was not the target (recipient) of this message
                    // the 'bot' is the recipient for events from the channel,
                    // context.activity.membersAdded == context.activity.recipient.Id indicates the
                    // bot was added to the conversation.
                    if (context.activity.membersAdded[idx].id !== context.activity.recipient.id) {
                        // Welcome user.
                        // When activity type is "conversationUpdate" and the member joining the conversation is the bot
                        // we will send our Welcome Adaptive Card.  This will only be sent once, when the Bot joins conversation
                        // To learn more about Adaptive Cards, see https://aka.ms/msbot-adaptivecards for more details.
                        await context.sendActivity(`${ await this.salutation() }, seja bem vindo!\n Eu sou a Palmirinha e posso lhe ajudar na compra de um bolo.\nConfira abaixo algumas das principais atividadades que posso estar efetuando ou simplesmente digite o que deseja.`);
                        await context.sendActivity(messageWithCarouselOfCards);
                        await context.sendActivity('Lembrando, sou apenas um bot, por isso lhe peço que fale uma coisa por vez, mas fique tranquilo que se eu não conseguir ajudá-lo, um dos nossos atendentes assumirá o controle!');
                    }
                }
            }
        }

        // make sure to persist state at the end of a turn.
        await this.conversationState.saveChanges(context);
        await this.userState.saveChanges(context);
    }

    /**
     * Get the initial greeting based on the time
     */
    async salutation() {
        let salutation = new Moment().subtract(3, 'hours');

        if (salutation.hour() < 12) return 'Bom dia';
        else if (salutation.hour() >= 12 && salutation.hour() < 18) return 'Boa tarde';
        else return 'Boa noite';
    }

    /**
     * Look at the LUIS results and determine if we need to handle
     * an interruptions due to a Help or Cancel intent
     *
     * @param {DialogContext} dc - dialog context
     * @param {LuisResults} luisResults - LUIS recognizer results
     */
    async isTurnInterrupted(dc, luisResults) {
        const topIntent = LuisRecognizer.topIntent(luisResults);

        // see if there are any conversation interrupts we need to handle
        if (topIntent === CANCELORDER_INTENT) {
            if (dc.activeDialog) {
                // cancel all active dialog (clean the stack) and clear conversation data
                await this.userProfileAccessor.set(dc.context, undefined); // cleaning up data
                await dc.cancelAllDialogs();
                await dc.context.sendActivity(`Ok. Eu cancelei o pedido em andamento.`);
            } else {
                await dc.context.sendActivity(`Infelizmente, não há nenhum pedido em andamento.`);
            }
            return true; // this is an interruption
        } else if (topIntent === CONTACT_INTENT) {
            await dc.beginDialog(CONTACT_DIALOG);
            return true;
        } else if (topIntent === GREETING_INTENT) {
            await dc.beginDialog(GREETING_DIALOG);
            return true; // this is an interruption
        }
        return false; // this is not an interruption
    }

    /**
     * Helper function to update user profile with entities returned by LUIS.
     *
     * @param {LuisResults} luisResults - LUIS recognizer results
     * @param {DialogContext} dc - dialog context
     */
    async updateUserProfile(luisResult, context) {
        // Do we have any entities?
        if (Object.keys(luisResult.entities).length !== 1) {
            // get userProfile object using the accessor
            let userProfile = await this.userProfileAccessor.get(context);
            if (userProfile === undefined) {
                userProfile = new ConversationData();
            }
            // // see if we have any user name entities
            // USER_NAME_ENTITIES.forEach(name => {
            //     if (luisResult.entities[name] !== undefined) {
            //         let lowerCaseName = luisResult.entities[name][0];
            //         // capitalize and set user name
            //         userProfile.name = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.substr(1);
            //     }
            // });
            // USER_LOCATION_ENTITIES.forEach(city => {
            //     if (luisResult.entities[city] !== undefined) {
            //         let lowerCaseCity = luisResult.entities[city][0];
            //         // capitalize and set user name
            //         userProfile.city = lowerCaseCity.charAt(0).toUpperCase() + lowerCaseCity.substr(1);
            //     }
            // });
            // set the new values
            await this.userProfileAccessor.set(context, userProfile);
        }
    }
}

module.exports.ReboloBot = ReboloBot;
