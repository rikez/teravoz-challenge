const baseEventDispatcher = require('./base.event.dispatcher')('call');
const { CallStatus } = require('../status/call.status');
const { enqueue, dequeue } = require('../persistence/queue.dao');
const { getNextAgentAvailable } = require('../persistence/agents.dao');
const { delegate } = require('../actions/delegate.action');
const { logIn } = require('./actor.event');



/**
 * @description This calls new call Event and Logs Actor in to pick up calls;
 * @param {Object} payload 
 */
const prepareNewCall = function(payload) {
    callStandByEvent(payload)
}

/**
 * @description This method is waiting to delegate the call
 * @param {Object} payload 
 */
const callStandByEvent = function(payload) {

    const { dialUniqueCode } = payload;

    const eventName = `${CallStatus.STANDBY}_${dialUniqueCode}`;

    baseEventDispatcher.
        watch(eventName, (payload) => delegate(payload));

    baseEventDispatcher
        .dispatch(eventName, { ...payload, type: CallStatus.STANDBY}, 1000);
}


module.exports = { prepareNewCall }