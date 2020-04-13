var validator = require('email-validator');

const payerEmailValidator = (email) => {
    if (email.length <= 0 || email.length > 90) {
        throw new Error('O e-mail do pagador não deve conter 0 ou mais de 90 caracteres.');
    } else if (!validator(email)) {
        throw new Error('E-mail inválido. Por favor, digite novamente.');
    }
};

module.exports = {
    payerEmailValidator
};
