const requestHasProductDiscountValidator = (discount) => {
    if (isNaN(parseFloat(discount)) && !isFinite(discount)) {
        throw new Error('O valor do desconto deve ser um número!');
    }
};

module.exports = {
    requestHasProductDiscountValidator
};
