const productValidator = (product) => {
    if (product !== 'Banana com Castanha do Pará' && product !== 'Cenoura com Chocolate' &&
        product !== 'Chocolate') {
        throw new Error('Por favor, selecione um botão.');
    }
};

module.exports = {
    productValidator
};
