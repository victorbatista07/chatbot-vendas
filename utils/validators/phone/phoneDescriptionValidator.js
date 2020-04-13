const phoneDescriptionValidator = (description) => {
    if (description.length <= 0 || description.length > 15) {
        throw new Error('A descrição do contato não pode conter 0 ou mais de 15 caracteres.');
    }
};

module.exports = {
    phoneDescriptionValidator
};
