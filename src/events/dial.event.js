const { prepareNewCall } = require('./call.event');
const baseEventDispatcher = require('./base.event.dispatcher')('dial');
const { DialerStatus } = require('../status/dialer.status');
const env = require('../config/env.json');

const our_number = env.OUR_NUMBER;

/**
 * @description This method attempts to make calls, and dispatch success or failure events.
 * @param {Array} verifiedClients 
 * @param {String} uniqueDataObject 
 */
const attemptEvent = function(verifiedClients, uniqueDataObject) {

    const { dialUniqueCode, code } = uniqueDataObject;
    const eventName = `${DialerStatus.ATTEMPT}_${dialUniqueCode}`;

    baseEventDispatcher
        .watch(eventName, (payload) => {

            if(payload.success) {
                dialSuccessEvent(payload, dialUniqueCode, code);
                return;
            }

            dialFailureEvent(payload, dialUniqueCode, code);
        })
        .dispatch(eventName, attempt(verifiedClients));
    
}

/**
 * @description Called when a dial fails...
 * @param {Object} payload 
 * @param {String} dialUniqueCode
 * @param {Number} code 
 */
const dialFailureEvent = function(payload, dialUniqueCode, code) {
    const eventName = `${DialerStatus.FAILURE}_${dialUniqueCode}`;

    baseEventDispatcher
        .watch(eventName, (payload) =>  console.log(payload));

    // Awaits 10 seconds to prepare...
    setTimeout(() => {
        baseEventDispatcher.dispatch(eventName, {
            destination: payload.client.returning,
            call_id: dialUniqueCode,
            type: "dial.failure"
        });
    }, 100000);
}

/**
 * @description Called when a dial succeed, then call  will be delegated.
 * @param {Object} payload 
 * @param {String} dialUniqueCode
 * @param {Number} code 
 */
const dialSuccessEvent = function(payload, dialUniqueCode, code) {

    const { returning, number } = payload.client;

    const eventName = `${DialerStatus.SUCCESS}_${dialUniqueCode}`;

    baseEventDispatcher
        .watch(eventName, (payload) => prepareNewCall(payload));

    // Awaits 10 seconds to prepare...
    setTimeout(() => {
        baseEventDispatcher.dispatch(eventName, {
            destination: returning,
            call_id: dialUniqueCode,
            type: "call.new", 
            direction: 'inbound',
            timestamp: new Date().toISOString(),
            number,
            code,
            our_number
        }, 0);
    });

}

/**
 * This method attempts to call numbers till it succeed with one of them.
 * @param {Array} clients 
 * @param {Number} i 
 */
const attempt = function(clients, i) {

    try {
        for(let client of clients) {

            console.log("Trying to dial number: ", client.number);

            if(client.number.length < 8 || client.number.match(/\D/g)) {
                throw Error("Number does not have correct pattern");
            }

            console.log("Dial succeeded with number: ", client.number);

            return { client, success: true, message: "success dialing" };
        }
    } catch (error) {
        console.log("Failed to dial number: ", clients[0].number);
        /** Call recursively till it reaches number max of attempts */
        if(i >= clients.length) {
            return { error: true, message: "Maximum attempts reached" };
        }

        console.log("\nRetrying...\n");
        i += 1;
        setTimeout(() => attempt(clients.slice(1, clients.length), i), i * 1000);
    }

}


module.exports = { dialSuccessEvent, dialFailureEvent, attemptEvent }