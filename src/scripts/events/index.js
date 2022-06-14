const eventEmitter = require('./eventEmitter')
const EventTypes = require('../../constants/EventType')

module.exports = () => {
    
    eventEmitter.on(EventTypes.sendMessage, async (messageData) => {

    })

    eventEmitter.on(EventTypes.sendOffer, async (offerData) => {

    })

    eventEmitter.on(EventTypes.sendMail, async (mailData) => {
        
    })
}