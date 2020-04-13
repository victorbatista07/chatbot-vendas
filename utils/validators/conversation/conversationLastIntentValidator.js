const conversationLastIntentValidator = (intent) => {
    if (intent.length <= 0 || intent.length > 30) {
        throw new Error('A descrição da última intenção da conversa não pode conter 0 ou mais de 30 caracteres.');
    }
};

module.exports = {
    conversationLastIntentValidator
};
