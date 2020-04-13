const productDetailsValidator = (details) => {
    if (details.length <= 0 || details.length > 250) {
        throw new Error('Os detalhes do produto não pode conter 0 ou mais de 250 caracteres.');
    }
};

module.exports = {
    productDetailsValidator
};
