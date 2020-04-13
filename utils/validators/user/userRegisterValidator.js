const userRegisterValidator = (register) => {
    if (register.length <= 0 || register.length > 25) {
        throw new Error('O registro do usuário não pode conter 0 ou mais de 25 caracteres.');
    }
};

module.exports = {
    userRegisterValidator
};
