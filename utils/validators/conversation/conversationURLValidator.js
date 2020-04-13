const conversationURLValidator = (url) => {
    if (url.length <= 0 || url.length > 100) {
        throw new Error('A URL da conversa não pode conter 0 ou mais de 100 caracteres. ');
    }
};

module.exports = {
    conversationURLValidator
};
