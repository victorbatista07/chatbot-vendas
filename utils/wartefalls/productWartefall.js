const { MessageFactory } = require('botbuilder');
const { PRODUCT_STEP, AMOUNT_PRODUCT_PROMPT, CONFIRM_PROMPT, PRODUCT_PROMPT } = require('../ids/ids');
const { Products } = require('../../app/controllers');

async function promptForProductStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (!userProfile.productDescription || userProfile.productDescription.length > 0) {
        let reply = MessageFactory.suggestedActions(['Banana com Castanha do Pará', 'Cenoura com Chocolate', 'Chocolate'], 'Qual bolo você quer?');
        return await step.prompt(PRODUCT_PROMPT, reply);
    } else {
        return await step.next();
    }
}

async function promptForAmountProductStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);
    let price = '';

    if (userProfile.productDescription === undefined && step.result) {
        userProfile.productPrice = [];
        userProfile.productDescription = [];

        userProfile.productDescription.push(step.result);

        await Products.findAll({
            attributes: ['price'],
            where: {
                description: userProfile.productDescription[userProfile.productDescription.length - 1]
            }
        }).then(function(produto) {
            price = produto[0].price;
        });

        userProfile.productPrice.push(price);
        await this.userProfileAccessor.set(step.context, userProfile);
    } else if (step.result) {
        userProfile.productDescription.push(step.result);

        await Products.findAll({
            attributes: ['price'],
            where: {
                description: userProfile.productDescription[userProfile.productDescription.length - 1]
            }
        }).then(function(produto) {
            price = produto[0].price;
        });

        userProfile.productPrice.push(price);
        await this.userProfileAccessor.set(step.context, userProfile);
    }
    if (!userProfile.productAmount || userProfile.productDescription.length > 0) {
        return await step.prompt(AMOUNT_PRODUCT_PROMPT, `Legal! Um bolo de ${ userProfile.productDescription[userProfile.productDescription.length - 1] } custa R$ ${ userProfile.productPrice[userProfile.productPrice.length - 1] }. Quantos você deseja?`);
    } else {
        return await step.next();
    }
}

async function loopProductStep(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.productAmount === undefined && step.result) {
        userProfile.productAmount = [];
        userProfile.productAmount.push(step.result);
        await this.userProfileAccessor.set(step.context, userProfile);
    } else if (step.result) {
        userProfile.productAmount.push(step.result);
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (!userProfile.loopProduct) {
        let reply = MessageFactory.suggestedActions(['Sim', 'Não'], 'Deseja adicionar outro produto?');
        return await step.prompt(CONFIRM_PROMPT, reply);
    } else {
        return await step.next();
    }
}

async function endProductDialog(step) {
    const userProfile = await this.userProfileAccessor.get(step.context);

    if (userProfile.loopProduct === undefined && step.result) {
        userProfile.loopProduct = step.result;
        await this.userProfileAccessor.set(step.context, userProfile);
    }

    if (userProfile.loopProduct === 'Sim') {
        userProfile.loopProduct = undefined;
        await this.userProfileAccessor.set(step.context, userProfile);
        return await step.replaceDialog(PRODUCT_STEP);
    } else {
        return await step.endDialog();
    }
}

module.exports = {
    promptForProductStep,
    promptForAmountProductStep,
    loopProductStep,
    endProductDialog
};
