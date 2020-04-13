const botDescriptionValidator = (description) => {
    if (description.length <= 0 || description.length > 30) {
        throw new Error('A descrição do Bot não pode conter 0 ou mais de 30 caracteres.');
    }
};

module.exports = {
    botDescriptionValidator
};
