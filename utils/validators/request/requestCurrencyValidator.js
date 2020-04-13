const requestCurrencyValidator = (currency) => {
    if (currency.length <= 0 || currency.length > 3) {
        throw new Error('A descrição da moeda de pagamento não pode conter 0 ou mais de 3 caracteres.');
    }
};

module.exports = {
    requestCurrencyValidator
};
