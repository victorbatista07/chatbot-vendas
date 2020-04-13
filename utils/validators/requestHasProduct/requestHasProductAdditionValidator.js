const requestHasProductAdditionValidator = (addition) => {
    if (isNaN(parseFloat(addition)) && !isFinite(addition)) {
        throw new Error('O valor do preço adicional deve ser um número!');
    }
};

module.exports = {
    requestHasProductAdditionValidator
};
