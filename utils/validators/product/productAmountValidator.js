const productAmountValidator = (amount) => {
    if (isNaN(parseFloat(amount)) && !isFinite(amount)) {
        throw new Error('A quantidade de produto deve ser um número.');
    }
};

module.exports = {
    productAmountValidator
};
