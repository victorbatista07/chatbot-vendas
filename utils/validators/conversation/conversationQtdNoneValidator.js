const conversationQtdNoneValidator = (value) => {
    if (isNaN(parseFloat(value)) && !isFinite(value)) {
        throw new Error('A quantidade de none deve ser um número.');
    }
};

module.exports = {
    conversationQtdNoneValidator
};
