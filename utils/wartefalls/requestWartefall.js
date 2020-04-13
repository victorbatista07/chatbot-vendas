const { MessageFactory } = require('botbuilder');
const { REQUEST_DIALOG, ADDRESSE_STEP, PAYER_STEP, PHONE_STEP, PRODUCT_STEP, CONFIRM_PROMPT, PAYMENT_PROMPT, NAME_PROMPT } = require('../ids/ids');
const { ConversationData } = require('./../../app/models/conversationData');

async function initializeRequestStep(step) {
    let userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile === undefined) {
        if (step.options && step.options.userProfile) {
            await this.userProfileAccessor.set(step.context, step.options.userProfile);
        } else {
            await step.context.sendActivity('Preciso que você me informe alguns dados, para que eu possa anotar e efetuar o seu pedido.');
            await this.userProfileAccessor.set(step.context, new ConversationData());
        }
    } else {
        await step.context.sendActivity('Preciso que você me informe alguns dados, para que eu possa anotar e efetuar o seu pedido.');
    }

    return await step.next();
}

async function promptForNameStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile !== undefined && userProfile.clientName !== undefined && userProfile.requestPayment === 'Dinheiro') {
        return await step.beginDialog(PRODUCT_STEP);
    } else if (userProfile !== undefined && userProfile.clientName !== undefined && userProfile.requestPayment === 'Cartão de Crédito') {
        return await step.beginDialog(PAYER_STEP);
    }
    if (!userProfile.clientName) {
        return await step.prompt(NAME_PROMPT, 'Por favor, me diga o seu nome.');
    } else {
        return await step.next();
    }
}

async function promptForPaymentStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.clientName === undefined && step.result) {
        userProfile.clientName = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }
    if (!userProfile.requestPayment) {
        let reply = MessageFactory.suggestedActions(['Cartão de Crédito', 'Dinheiro'], `Olá ${ userProfile.clientName }, tudo bem? Qual será a forma de pagamento?`);
        return await step.prompt(PAYMENT_PROMPT, reply);
    } else {
        return await step.next();
    }
}

async function startSelectionStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.requestPayment === undefined && step.result) {
        userProfile.requestPayment = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }
    if (userProfile.requestPayment === 'Dinheiro' && userProfile.productAmount === undefined) {
        return await step.beginDialog(PRODUCT_STEP);
    } else {
        return await step.next();
    }
}

async function initializeAddresseStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile) {
        return await step.beginDialog(ADDRESSE_STEP);
    } else {
        return await step.endDialog();
    }
}

async function initializePhoneStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile) {
        return await step.beginDialog(PHONE_STEP);
    } else {
        return await step.endDialog();
    }
}

async function displaySummaryStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);
    let i = 0;
    let products = '';
    let contacts = '';

    for (i = 0; i < userProfile.productDescription.length; i++) {
        products += '\n' + userProfile.productDescription[i] + ' - Qtd:' + userProfile.productAmount[i] + 'Total: R$' + userProfile.productAmount[i] * userProfile.productPrice[i];
    }

    for (i = 0; i < userProfile.phoneNumber.length; i++) {
        contacts += '\n' + userProfile.phoneNumber[i] + ' - ' + userProfile.phoneDescription[i];
    }

    let reply = `Resume:
    Nome: ${ userProfile.clientName }
    Produtos: ${ products }
    Forma de Pagamento: ${ userProfile.requestPayment }
    CEP: ${ userProfile.addresseCep }
    Bairro: ${ userProfile.addresseDistrict }
    Rua: ${ userProfile.addresseStreet }
    Número: ${ userProfile.addresseNumber }
    Complemento: ${ userProfile.addresseComplement }
    Telefones: ${ contacts }`;
    await step.context.sendActivity(reply);

    reply = MessageFactory.suggestedActions(['Sim', 'Não'], 'Está certo?');
    return await step.prompt(CONFIRM_PROMPT, reply);
}

async function endRequestStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.requestConfirm === undefined && step.result) {
        userProfile.requestConfirm = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (userProfile.requestConfirm === 'Sim') {
        await step.context.sendActivity('PERFEITO! Vamos iniciar um simples cadastro para que você tenha um perfil personalizado!');
        userProfile.requestConfirm = undefined;
        return await step.beginDialog();
    } else {
        await step.context.sendActivity('Hum.. Vamos recomeçar, tudo bem? Você pode cancelar a hora que quiser!');
        await this.userProfileAccessor.set(step.context, {});
        return await step.replaceDialog(REQUEST_DIALOG);
    }
}

module.exports = {
    initializeRequestStep,
    promptForNameStep,
    promptForPaymentStep,
    startSelectionStep,
    initializeAddresseStep,
    initializePhoneStep,
    displaySummaryStep,
    endRequestStep
};
