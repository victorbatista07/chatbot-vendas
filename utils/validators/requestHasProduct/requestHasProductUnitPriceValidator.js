const requestHasProductUnitPriceValidator = (price) => {
    if (isNaN(parseFloat(price)) && !isFinite(price)) {
        throw new Error('O valor do preço unitário deve ser um número!');
    }
};

module.exports = {
    requestHasProductUnitPriceValidator
};
