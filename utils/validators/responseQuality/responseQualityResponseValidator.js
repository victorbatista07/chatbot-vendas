const responseQualityResponseValidator = (response) => {
    if (response !== 0 && response !== 1) {
        throw new Error('O valor booleano da qualidade da resposta não pode ser diferente de 0 e 1.');
    }
};

module.exports = {
    responseQualityResponseValidator
};
