const baseEventDispatcher = require('../events/base.event.dispatcher')('delegate');
const { CallStatus } = require('../status/call.status');
const { enqueue, dequeue } = require('../persistence/queue.dao');
const { getNextAgentAvailable } = require('../persistence/agents.dao');
const { logIn } = require('../events/actor.event');
const { logCallWasDelegated } = require('../utils/logger');

/**
 * @description This method is gonna delegate the call to a queue 900 to new client n 910 to returning ones.
 * @param {Object} payload 
 */
const delegate = async function(payload) {

    try {
        const { destination, call_id, number} = payload;
        const agent = getNextAgentAvailable(destination);

        if(!agent) {
            // TODO: implement something like a bot.
            console.log("There are no attendants at this moment, please try once again later");
            process.exit(0);
        }

        const freshPayload = mapClientData(payload);

        const clientData = { ...freshPayload };

        const isQueued = await enqueue(clientData, destination);

        logCallWasDelegated(call_id, number, destination);

        logIn(agent);

        return isQueued;

    } catch(error) {
        return error;
    }

}

const mapClientData = function(payload) {
    delete payload.type;
    delete payload.our_number;

    return { ...payload };
}

module.exports = { delegate }