const requestShippingValidator = (shipping) => {
    if (isNaN(parseFloat(shipping)) && !isFinite(shipping)) {
        throw new Error('O valor do frete deve ser um número!');
    }
};

module.exports = {
    requestShippingValidator
};
