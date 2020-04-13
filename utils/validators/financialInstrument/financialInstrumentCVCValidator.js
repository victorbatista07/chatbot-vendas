const financialInstrumentCVCValidator = (crip) => {
    if (crip.length <= 0 || crip.length > 50) {
        throw new Error('A criptografia do CVC do instrumento de financiamento não deve conter 0 ou mais de 50 caracteres.');
    }
};

module.exports = {
    financialInstrumentCVCValidator
};
