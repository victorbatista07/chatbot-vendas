const financialInstrumentsNameValidator = (name) => {
    let _regexNumber = RegExp('[^A-Z a-z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$');

    if (name.length <= 0 || name.length > 65) {
        throw new Error('O nome do proprietário do instrumento de financiamento não deve conter 0 ou mais de 65 caracteres.');
    } else if (_regexNumber.test(name)) {
        throw new Error('O nome do proprietário do instrumento de financiamento só pode ter letras.');
    }
};

module.exports = {
    financialInstrumentsNameValidator
};
