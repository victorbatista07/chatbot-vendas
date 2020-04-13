const conversationChannelValidator = (channel) => {
    if (channel.length <= 0 || channel.length > 30) {
        throw new Error('A descrição do canal da conversa não pode conter 0 ou mais de 30 caracteres.');
    }
};

module.exports = {
    conversationChannelValidator
};
