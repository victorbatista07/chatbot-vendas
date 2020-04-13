const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');

// Dialog IDs
const CONTACT_DIALOG = 'contactDialog';

class ContactDialog extends ComponentDialog {
    constructor(dialogId) {
        super(dialogId);

        if (!dialogId) throw new Error('Missing parameter.  dialogId is required');

        this.addDialog(new WaterfallDialog(CONTACT_DIALOG, [
            this.displayGreetingStep.bind(this)
        ]));
    }

    async displayGreetingStep(step) {
        await step.context.sendActivity('Contato');
        return await step.endDialog();
    }
}

exports.ContactDialog = ContactDialog;
