const { MessageFactory } = require('botbuilder');
const { PHONE_STEP, CONFIRM_PROMPT, DESCRIPTION_PROMPT, PHONE_PROMPT } = require('../ids/ids');

async function promptForPhoneStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (!userProfile.phoneNumber || userProfile.phoneNumber.length > 0) {
        return await step.prompt(PHONE_PROMPT, 'Qual é o número de contato?');
    } else {
        return await step.next();
    }
}

async function promptForPhoneDescription(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.phoneNumber === undefined && step.result) {
        userProfile.phoneNumber = [];
        userProfile.phoneNumber.push(step.result);
        await this.userProfileAccessor.set(step.context, userProfile);
    } else if (step.result) {
        userProfile.phoneNumber.push(step.result);
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (!userProfile.phoneDescription || userProfile.phoneNumber.length > 0) {
        return await step.prompt(DESCRIPTION_PROMPT, 'Por favor, qual é o tipo de contato (Celular, Casa ou Trabalho)?');
    } else {
        return await step.next();
    }
}

async function loopPhonesDialog(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.phoneDescription === undefined && step.result) {
        userProfile.phoneDescription = [];
        userProfile.phoneDescription.push(step.result);
        await this.userProfileAccessor.set(step.context, userProfile);
    } else if (step.result) {
        userProfile.phoneDescription.push(step.result);
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (!userProfile.loopPhones) {
        let reply = MessageFactory.suggestedActions(['Sim', 'Não'], 'Deseja adicionar outro número de contato?');
        return await step.prompt(CONFIRM_PROMPT, reply);
    } else {
        return await step.next();
    }
}

async function endPhoneDialog(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.loopPhones === undefined && step.result) {
        userProfile.loopPhones = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (userProfile.loopPhones === 'Sim') {
        userProfile.loopPhones = undefined;
        await this.userProfileAccessor.set(step.context, userProfile);
        return await step.replaceDialog(PHONE_STEP);
    } else {
        return await step.endDialog();
    }
}

module.exports = {
    promptForPhoneStep,
    promptForPhoneDescription,
    loopPhonesDialog,
    endPhoneDialog
};
