const addresseDistrictValidator = (name) => {
    if (name.length <= 0 || name.length > 90) {
        throw new Error('O nome do bairro não pode conter 0 ou mais de 90 caracteres.');
    }
};

module.exports = {
    addresseDistrictValidator
};
