const addresseNumberStreetValidator = (number) => {
    if (number.length <= 0 || number.length > 20) {
        throw new Error('O número da residência não pode conter 0 ou mais de 20 caracteres.');
    }
};

module.exports = {
    addresseNumberStreetValidator
};
