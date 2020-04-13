const requestHasProductAmountValidator = (amount) => {
    if (isNaN(parseFloat(amount)) && !isFinite(amount)) {
        throw new Error('A quantidade de produtos deve ser um número!');
    }
};

module.exports = {
    requestHasProductAmountValidator
};
