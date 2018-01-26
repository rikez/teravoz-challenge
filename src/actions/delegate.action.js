const baseEventDispatcher = require('../events/base.event.dispatcher')('delegate');
const { CallStatus } = require('../status/call.status');
const { enqueue, dequeue } = require('../persistence/queue.dao');

/**
 * @description This method is gonna delegate the call to a queue 900 to new client n 910 to returning ones.
 * @param {Object} payload 
 */
const delegate = async function(payload) {

    try {
        const freshPayload = mapClientData(payload);

        const { destination } = freshPayload;
    
        const clientData = JSON.stringify({ ...freshPayload });
    
        const isQueued = await enqueue(clientData, destination);

        return isQueued;

    } catch(error) {
        console.log("ERROR => ", error.toString());
        return err.message;
    }

}

const mapClientData = function(payload) {
    delete payload.type;
    delete payload.our_number;

    return { ...payload };
}

module.exports = { delegate }