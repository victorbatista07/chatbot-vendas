const { ComponentDialog, WaterfallDialog, TextPrompt, NumberPrompt } = require('botbuilder-dialogs');
const { MessageFactory } = require('botbuilder');
const {
    // #region Import of Validators
    // Adresse
    AddresseCepValidator,
    AddresseComplementValidator,
    AddresseDistrictValidator,
    AddresseNumberStreetValidator,
    AddresseStreetValidator,

    // Client
    ClientNameValidator,

    // Phone
    PhoneDescriptionValidator,
    PhoneValidator,

    // Product
    ProductAmountValidator,
    ProductValidator,

    // Request
    RequestPaymentValidator,

    ConfirmationValidator,
    // #endregion

    // #region IDs Import
    // Step
    ADDRESSE_STEP,
    // PAYER_STEP,
    PHONE_STEP,
    PRODUCT_STEP,
    // REGISTER_STEP,

    // Dialog
    REQUEST_DIALOG,

    // Prompt
    ADDRESSE_COMPLEMENT_PROMPT,
    AMOUNT_PRODUCT_PROMPT,
    CEP_PROMPT,
    CONFIRM_PROMPT,
    DISTRICT_PROMPT,
    DESCRIPTION_PROMPT,
    NAME_PROMPT,
    NUMBER_STREET_PROMPT,
    PAYMENT_PROMPT,
    PHONE_PROMPT,
    PRODUCT_PROMPT,
    STREET_PROMPT,
    // #endregion

    // #region Import Steps
    PromptForProductStep,
    PromptForAmountProductStep,
    LoopProductStep,
    EndProductDialog,
    InitializeRequestStep,
    PromptForNameStep,
    PromptForPaymentStep,
    StartSelectionStep,
    InitializeAddresseStep,
    InitializePhoneStep,
    DisplaySummaryStep,
    EndRequestStep,
    PromptForCepStep,
    PromptForStreetStep,
    PromptForNumberStreetStep,
    AddresseComplementStep,
    LoopAddresseDialog,
    EndAddresseDialog,
    PromptForPhoneStep,
    PromptForPhoneDescription,
    LoopPhonesDialog,
    EndPhoneDialog
    // #endregion
} = require('../../utils');

var result;

class RequestDialog extends ComponentDialog {
    constructor(dialogId, userProfileAccessor) {
        super(dialogId);

        if (!dialogId) {
            throw new Error('Missing parameter.  dialogId is required');
        }
        if (!userProfileAccessor) {
            throw new Error('Missing parameter.  userProfileAccessor is required');
        }

        this.addDialog(new WaterfallDialog(REQUEST_DIALOG, [
            InitializeRequestStep.bind(this),
            PromptForNameStep.bind(this),
            PromptForPaymentStep.bind(this),
            StartSelectionStep.bind(this),
            InitializeAddresseStep.bind(this),
            InitializePhoneStep.bind(this),
            DisplaySummaryStep.bind(this),
            EndRequestStep.bind(this)
        ]));

        this.addDialog(new WaterfallDialog(PRODUCT_STEP, [
            PromptForProductStep.bind(this),
            PromptForAmountProductStep.bind(this),
            LoopProductStep.bind(this),
            EndProductDialog.bind(this)
        ]));

        this.addDialog(new WaterfallDialog(ADDRESSE_STEP, [
            PromptForCepStep.bind(this),
            this.promptConfirmAddresseStep.bind(this),
            this.promptForDistrictStep.bind(this),
            PromptForStreetStep.bind(this),
            PromptForNumberStreetStep.bind(this),
            AddresseComplementStep.bind(this),
            LoopAddresseDialog.bind(this),
            EndAddresseDialog.bind(this)
        ]));

        this.addDialog(new WaterfallDialog(PHONE_STEP, [
            PromptForPhoneStep.bind(this),
            PromptForPhoneDescription.bind(this),
            LoopPhonesDialog.bind(this),
            EndPhoneDialog.bind(this)
        ]));

        // this.addDialog(new WaterfallDialog(PAYER_STEP, [
        //     this.initializePayerStep.bind(this),
        //     this.initializeFinancialInstrumentStep.bind(this)
        // ]));

        this.addDialog(new TextPrompt(NAME_PROMPT, this.nameValidator));
        this.addDialog(new TextPrompt(PAYMENT_PROMPT, this.paymentValidator));
        this.addDialog(new TextPrompt(PRODUCT_PROMPT, this.productValidator));
        this.addDialog(new NumberPrompt(AMOUNT_PRODUCT_PROMPT, this.amountValidator, 'pt-br'));
        this.addDialog(new TextPrompt(CEP_PROMPT, this.cepValidator));
        this.addDialog(new TextPrompt(CONFIRM_PROMPT, this.confirmationValidator));
        this.addDialog(new TextPrompt(DISTRICT_PROMPT, this.districtValidator));
        this.addDialog(new TextPrompt(STREET_PROMPT, this.streetValidator));
        this.addDialog(new TextPrompt(NUMBER_STREET_PROMPT, this.numberStreetValidator));
        this.addDialog(new TextPrompt(ADDRESSE_COMPLEMENT_PROMPT, this.addresseComplementValidator));
        this.addDialog(new TextPrompt(PHONE_PROMPT, this.phoneValidator));
        this.addDialog(new TextPrompt(DESCRIPTION_PROMPT, this.descriptionValidator));

        this.userProfileAccessor = userProfileAccessor;
    }

    async promptConfirmAddresseStep(step) {
        const userProfile = await this.userProfileAccessor.get(step.context);

        if (userProfile.addresseCep === undefined && result.cep) {
            userProfile.addresseCep = result.cep;
            await this.userProfileAccessor.set(step.context, userProfile);
        }

        if (!userProfile.addresseConfirm) {
            let reply = MessageFactory.suggestedActions(['Sim', 'Não'],
                `Encontrei este endereço:
            CEP: ${ result.cep }
            Bairro: ${ result.neighborhood }
            Rua: ${ result.street }
            Está certo?`);
            return await step.prompt(CONFIRM_PROMPT, reply);
        } else {
            return await step.next();
        }
    }

    async promptForDistrictStep(step) {
        const userProfile = await this.userProfileAccessor.get(step.context);

        if (userProfile.addresseConfirm === undefined && step.result) {
            userProfile.addresseConfirm = step.result;
            await this.userProfileAccessor.set(step.context, userProfile);
        }

        if (userProfile.addresseConfirm === 'Sim') {
            userProfile.addresseDistrict = result.neighborhood;
            userProfile.addresseStreet = result.street;
            await this.userProfileAccessor.set(step.context, userProfile);
            return await step.next();
        }
        if (!userProfile.addresseDistrict) {
            return await step.prompt(DISTRICT_PROMPT, 'Por favor, me diga o nome do seu bairro.');
        } else {
            return await step.next();
        }
    }

    // #region Validators

    async nameValidator(promptContext) {
        try {
            ClientNameValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async paymentValidator(promptContext) {
        try {
            RequestPaymentValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async productValidator(promptContext) {
        try {
            ProductValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async amountValidator(promptContext) {
        try {
            ProductAmountValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async cepValidator(promptContext) {
        try {
            result = undefined;
            await promptContext.context.sendActivity('Estou verificando o seu CEP, aguarde um momento.');
            result = await AddresseCepValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async confirmationValidator(promptContext) {
        try {
            ConfirmationValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async districtValidator(promptContext) {
        try {
            AddresseDistrictValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async streetValidator(promptContext) {
        try {
            AddresseStreetValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async numberStreetValidator(promptContext) {
        try {
            AddresseNumberStreetValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async addresseComplementValidator(promptContext) {
        try {
            AddresseComplementValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async phoneValidator(promptContext) {
        try {
            PhoneValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    async descriptionValidator(promptContext) {
        try {
            PhoneDescriptionValidator(promptContext.recognized.value);
            return true;
        } catch (err) {
            await promptContext.context.sendActivity(err.message);
            return false;
        }
    }

    // #endregion

    async resumeDialog(dc, reason, result) {
        if (result) {
            return await dc.cancellAllDialogs();
        } else {
            return await super.resumeDialog(dc, reason, result);
        }
    }
}

exports.RequestDialog = RequestDialog;
