const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');
const Moment = require('moment');

// Dialog IDs
const GREETING_DIALOG = 'greetingDialog';

class GreetingDialog extends ComponentDialog {
    constructor(dialogId) {
        super(dialogId);

        if (!dialogId) throw new Error('Missing parameter.  dialogId is required');

        this.addDialog(new WaterfallDialog(GREETING_DIALOG, [
            this.displayGreetingStep.bind(this)
        ]));
    }

    async displayGreetingStep(step) {
        await step.context.sendActivity(`${ await this.Salutation() }! Espero que esteja tendo um ótimo dia! Como posso te ajudar?`);
        return await step.endDialog();
    }

    async Salutation() {
        let salutation = new Moment().subtract(3, 'hours');
        if (salutation.hour() < 12) return 'Bom dia';
        else if (salutation.hour() >= 12 && salutation.hour() < 18) return 'Boa tarde';
        else return 'Boa noite';
    };
}

exports.GreetingDialog = GreetingDialog;
