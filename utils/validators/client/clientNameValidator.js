const clientNameValidator = (name) => {
    let _regexNumber = RegExp('[^A-Z a-z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$');

    if (name.length <= 0 || name.length > 90) {
        throw new Error('O nome do cliente não deve ter 0 ou mais de 90 caracteres.');
    } else if (_regexNumber.test(name)) {
        throw new Error('O nome do cliente só pode ter letras.');
    }
};

module.exports = {
    clientNameValidator
};
