const requestHasProductTotalPriceValidator = (price) => {
    if (isNaN(parseFloat(price)) && !isFinite(price)) {
        throw new Error('O valor do preço total deve ser um número!');
    }
};

module.exports = {
    requestHasProductTotalPriceValidator
};
