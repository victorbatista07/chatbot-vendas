const { ActionTypes, MessageFactory, CardFactory } = require('botbuilder');

let messageWithCarouselOfCards = MessageFactory.carousel([
    CardFactory.heroCard('',
        CardFactory.images(['https://s3-sa-east-1.amazonaws.com/interface-mi/capas/meuingles_0291L.jpg']),
        CardFactory.actions([{
            type: ActionTypes.ImBack,
            title: 'Realizar um Pedido',
            value: 'Gabriel'
        }])),
    CardFactory.heroCard('',
        CardFactory.images(['https://s3-sa-east-1.amazonaws.com/interface-mi/capas/meuingles_0291L.jpg']),
        CardFactory.actions([{
            type: ActionTypes.ImBack,
            title: 'Consultar um Pedido',
            value: 'Quero saber onde está o meu pedido'
        }])),
    CardFactory.heroCard('',
        CardFactory.images(['https://s3-sa-east-1.amazonaws.com/interface-mi/capas/meuingles_0291L.jpg']),
        CardFactory.actions([{
            type: ActionTypes.ImBack,
            title: 'Cancelar um Pedido',
            value: 'Quero cancelar um pedido'
        }])),
    CardFactory.heroCard('',
        CardFactory.images(['https://s3-sa-east-1.amazonaws.com/interface-mi/capas/meuingles_0291L.jpg']),
        CardFactory.actions([{
            type: ActionTypes.ImBack,
            title: 'Mostrar Cardápio',
            value: 'Me mostre o cardápio'
        }]))
]);

module.exports = {
    messageWithCarouselOfCards
};
