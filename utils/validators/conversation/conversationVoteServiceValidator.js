const conversationVoteServiceValidator = (value) => {
    if (value !== 0 && value !== 1) {
        throw new Error('O valor booleano do voto do serviço não pode ser diferente de 0 e 1.');
    }
};

module.exports = {
    conversationVoteServiceValidator
};
