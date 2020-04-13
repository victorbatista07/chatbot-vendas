var cpfValidator = require('cpf_cnpj').CPF;
var cnpjValidator = require('cpf_cnpj').CNPJ;

const payerCpfCnpjValidator = (number) => {
    let _ex = /[^0-9]/g;
    let _number = number.replace(_ex, '');
    // let _crip = ''; //devo adicionar o método de criptografia utilizado pela API de pagamentos

    if (_number.length === 11) {
        if (!cpfValidator(number)) {
            throw new Error('CPF inválido. Por favor, digite novamente.');
        }
    } else if (_number.length === 14) {
        if (!cnpjValidator(number)) {
            throw new Error('CNPJ inválido. Por favor, digite novamente.');
        }
    } else {
        throw new Error('Dado inválido. Por favor, digite novamente.');
    }

    // if (crip.length <= 0 || crip.length > 50)
    // throw new Error('A criptografia do cpf/cnpj do pagador não deve conter 0 ou mais de 50 caracteres.');
};

module.exports = {
    payerCpfCnpjValidator
};
