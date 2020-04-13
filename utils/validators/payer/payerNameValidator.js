const payerNameValidator = (name) => {
    let _regexNumber = RegExp('[^A-Z a-z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$');

    if (name.length <= 0 || name.length > 90) {
        throw new Error('O nome do pagador não deve ter 0 ou mais de 90 caracteres.');
    } else if (_regexNumber.test(name)) {
        throw new Error('O nome do pagador só pode ter letras.');
    }
};

module.exports = {
    payerNameValidator
};
