const botRegisterValidator = (register) => {
    if (register.length <= 0 || register.length > 25) {
        throw new Error('O número de registro do Bot não pode conter 0 ou mais de 25 caracteres.');
    }
};

module.exports = {
    botRegisterValidator
};
