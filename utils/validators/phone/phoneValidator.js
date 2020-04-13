const phoneValidator = (number) => {
    let _ex = /[^0-9]/g;
    let _number = number.replace(_ex, '');

    if (_number.length !== 8 && _number.length !== 9) {
        throw new Error('Telefone inválido. Por favor, digite o telefone sem o DDD e o DDI.');
    }
};

module.exports = {
    phoneValidator
};
