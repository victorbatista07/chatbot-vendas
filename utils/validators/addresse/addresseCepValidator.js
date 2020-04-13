var cepPromise = require('cep-promise');

const addresseCepValidator = async (cep) => {
    let _ex = /[^0-9]/g;
    let _number = cep.replace(_ex, '');
    let _erro, _result;

    if (_number.length !== 8) {
        throw new Error('CEP inválido. Por favor, digite novamente.');
    }

    await cepPromise(cep).then(function(result) {
        _result = result;
    }).catch(function() {
        _erro = 'CEP não encontrado. Por favor, digite novamente.';
    });

    if (_result) {
        return _result;
    }

    if (_erro) {
        throw new Error(_erro);
    }
};

module.exports = {
    addresseCepValidator
};
