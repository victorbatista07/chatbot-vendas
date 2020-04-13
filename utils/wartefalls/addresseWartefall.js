const { MessageFactory } = require('botbuilder');
const { ADDRESSE_STEP, ADDRESSE_COMPLEMENT_PROMPT, CEP_PROMPT, CONFIRM_PROMPT, NUMBER_STREET_PROMPT, STREET_PROMPT } = require('../ids/ids');

async function promptForCepStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (!userProfile.addresseCep) {
        return await step.prompt(CEP_PROMPT, 'Qual será o CEP de entrega?');
    } else {
        return await step.next();
    }
}

async function promptForStreetStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.addresseDistrict === undefined && step.result) {
        userProfile.addresseDistrict = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (!userProfile.addresseStreet) {
        return await step.prompt(STREET_PROMPT, 'Por favor, me diga o nome da sua rua.');
    } else {
        return await step.next();
    }
}

async function promptForNumberStreetStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.addresseStreet === undefined && step.result) {
        userProfile.addresseStreet = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (!userProfile.addresseNumber) {
        return await step.prompt(NUMBER_STREET_PROMPT, 'Por favor, me informe o número da residência.');
    } else {
        return await step.next();
    }
}

async function addresseComplementStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.addresseNumber === undefined && step.result) {
        userProfile.addresseNumber = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (!userProfile.addresseComplement) {
        return await step.prompt(ADDRESSE_COMPLEMENT_PROMPT, 'Por favor, me informe o complemento do seu endereço.');
    } else {
        return await step.next();
    }
}

async function loopAddresseDialog(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.addresseComplement === undefined && step.result) {
        userProfile.addresseComplement = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (!userProfile.addresseConfirmEnd) {
        let reply = MessageFactory.suggestedActions(['Sim', 'Não'],
            `Endereço Final:
        CEP: ${ userProfile.addresseCep }
        Bairro: ${ userProfile.addresseDistrict }
        Rua: ${ userProfile.addresseStreet }
        Número: ${ userProfile.addresseNumber }
        Complemento: ${ userProfile.addresseComplement }
        Está certo?`);
        return await step.prompt(CONFIRM_PROMPT, reply);
    } else {
        return await step.next();
    }
}

async function endAddresseDialog(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.addresseConfirmEnd === undefined && step.result) {
        userProfile.addresseConfirmEnd = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (userProfile.addresseConfirmEnd === 'Sim') {
        return await step.endDialog();
    } else {
        userProfile.addresseConfirm = undefined;
        userProfile.addresseConfirmEnd = undefined;
        userProfile.addresseCep = undefined;
        userProfile.addresseDistrict = undefined;
        userProfile.addresseStreet = undefined;
        userProfile.addresseNumber = undefined;
        userProfile.addresseComplement = undefined;
        await this.userProfileAccessor.set(step.context, userProfile);
        return await step.replaceDialog(ADDRESSE_STEP);
    }
}

module.exports = {
    promptForCepStep,
    promptForStreetStep,
    promptForNumberStreetStep,
    addresseComplementStep,
    loopAddresseDialog,
    endAddresseDialog
};
