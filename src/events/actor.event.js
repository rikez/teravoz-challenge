const baseEventDispatcher = require('./base.event.dispatcher')('actor');
const { ActorStatus } = require('../status/actor.status');
const { dequeue } = require('../persistence/queue.dao');
const { CallStatus } = require('../status/call.status');
const env = require('../config/env.json');

const our_number = env.OUR_NUMBER;
const baseUrl = env.BASE_URL_RECORD;

/**
 * @description Method logs an agent in and force him/her to pick a call
 * @param {Object} availableAgent 
 */
const logIn = function(availableAgent) {

    const { email, number, queue } = availableAgent;
    const eventName = `${ActorStatus.LOGGED_IN}_${email}`;
    
    baseEventDispatcher
        .watch(eventName, (agent) => {
            pickCall(agent)
        })
        .dispatch(eventName, {
            type: ActorStatus.LOGGED_IN,
            actor: email,
            number,
            queue,
            timestamp: new Date().toISOString()
        }, 2000)
}

/**
 * @description Tries to pick calls from determined queue
 * @param {Object} availableAgent 
 */
const pickCall = async function(availableAgent) {

    const { actor, number, queue } = availableAgent;

    const eventName = `${ActorStatus.ENTERED}_${actor}`;

    try {

        const isClient = await dequeue(queue);

        if(!isClient) {
            throw new Error("There are no clients in this queue.")
        }

        // DO stuff

        baseEventDispatcher
        .watch(eventName, (agent) => {
            onGoingCall(agent, isClient)
        })
        .dispatch(eventName, {
            type: ActorStatus.ENTERED,
            actor,
            number,
            queue,
            timestamp: new Date().toISOString()
        }, 2000);

    } catch(error) {
        setTimeout(() => pickCall(availableAgent), 3000);
    }

}


/**
 * @description This method stands for the ongoing call between actor and client...
 * @param {Object} actor
 * @param {Object} client 
 */
const onGoingCall = function(actor, client) {

    const { destination , call_id, direction, timestamp, number, code } = JSON.parse(client);
    const eventName = `${CallStatus.ONGOING}_${actor.actor}_${number}`;
    
    baseEventDispatcher
        .watch(eventName, (data) => {
            setTimeout(() => callFinishEvent(actor, data), 2000);
        })
        .dispatch(eventName, {
            type: CallStatus.ONGOING,
            call_id,
            code,
            direction,
            their_number: number,
            our_number,
            timestamp
        }, 2000);


    
}

/**
 * @description This method is emits event notitfying that call has finsihed emitting record event
 * @param {Object} actor 
 * @param {Object} client 
 */
const callFinishEvent = function(actor, client) {

    
    const { destination , call_id, direction, timestamp, number, code } = client;

    const eventName = `${CallStatus.FINISHED}_${actor.actor}_${number}`;

    baseEventDispatcher.
        watch(eventName, (payload) => callRecordAvailableEvent(payload));

    baseEventDispatcher
        .dispatch(eventName, {
            type: CallStatus.FINISHED,
            call_id,
            code,
            direction,
            their_number: number,
            our_number,
            timestamp
        }, 1000);
}

/**
 * @description This method is emits event notitfying that call has finsihed emitting record event
 * @param {Object} payload 
 */
const callRecordAvailableEvent = function(client) {

    const { call_id, timestamp } = client;

    const eventName = `${CallStatus.FINISHED}_${call_id}`;

    baseEventDispatcher.
        watch(eventName, (payload) => console.log("Done calling processing record."));

    baseEventDispatcher
        .dispatch(eventName, {
            call_id, 
            timestamp,
            type: CallStatus.RECORD_AVAILABLE,
            url: `${baseUrl}/${call_id}`
        }, 1000);
}






module.exports = { logIn }