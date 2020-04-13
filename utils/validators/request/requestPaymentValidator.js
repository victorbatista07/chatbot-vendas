const requestPaymentValidator = (payment) => {
    if (payment !== 'Cartão de Crédito' && payment !== 'Dinheiro') {
        throw new Error('Por favor, selecione um botão.');
    }
};

module.exports = {
    requestPaymentValidator
};
