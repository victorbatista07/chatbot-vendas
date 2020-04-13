const confirmationValidator = (value) => {
    if (value !== 'Sim' && value !== 'Não') {
        throw new Error('Por favor, selecione um botão.');
    }
};

module.exports = {
    confirmationValidator
};
