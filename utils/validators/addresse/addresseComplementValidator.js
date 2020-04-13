const addresseComplementValidator = (complement) => {
    if (complement.length <= 0 || complement.length > 50) {
        throw new Error('O complemento do endereço não pode conter 0 ou mais de 50 caracteres.');
    }
};

module.exports = {
    addresseComplementValidator
};
