const productDescriptionValidator = (description) => {
    if (description.length <= 0 || description.length > 50) {
        throw new Error('A descrição do produto não pode conter 0 ou mais de 50 caracteres.');
    }
};

module.exports = {
    productDescriptionValidator
};
