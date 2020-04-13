const userNameValidator = (name) => {
    if (name.length <= 0 || name.length > 50) {
        throw new Error('O nome do usuário não pode conter 0 ou mais de 50 caracteres.');
    }
};

module.exports = {
    userNameValidator
};
