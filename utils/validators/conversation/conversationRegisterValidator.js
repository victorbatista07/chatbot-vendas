const conversationRegisterValidator = (register) => {
    if (register.length <= 0 || register.length > 50) {
        throw new Error('O número de registro da conversa não pode conter 0 ou mais de 50 caracteres. ');
    }
};

module.exports = {
    conversationRegisterValidator
};
