const amountValidator = (amount) => {
    if (isNaN(parseFloat(amount)) && !isFinite(amount)) {
        throw new Error('Digite apenas números, por favor!');
    }
};

module.exports = {
    amountValidator
};
