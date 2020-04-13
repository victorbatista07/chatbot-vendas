const financialInstrumentDescriptionValidator = (description) => {
    if (description.length <= 0 || description.length > 11) {
        throw new Error('A descrição do instrumento de financiamento não deve conter 0 ou mais de 11 caracteres.');
    }
};

module.exports = {
    financialInstrumentDescriptionValidator
};
