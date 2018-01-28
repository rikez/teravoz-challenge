const { prepareNewCall } = require('./call.event');
const baseEventDispatcher = require('./base.event.dispatcher')('dial');
const { DialerStatus } = require('../status/dialer.status');

// TODO: Fix ENV Call
const env = require('../config/env.json')[process.env.ENV ? process.env.ENV : 'DEV'];

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
		});

	const attempting = attempt(verifiedClients);

	const mappedData = {
		type: DialerStatus.ATTEMPT,
		destination: attempting.client.returning,
		number: attempting.client.number,
		success: true
	};

	baseEventDispatcher
		.dispatch(eventName, mappedData);
    
};

/**
 * @description Called when a dial fails...
 * @param {Object} payload 
 * @param {String} dialUniqueCode
 * @param {Number} code 
 */
const dialFailureEvent = function(payload, dialUniqueCode, code) {
	const eventName = `${DialerStatus.FAILURE}_${dialUniqueCode}`;

	const { number, destination } = payload;

	baseEventDispatcher
		.watch(eventName, (payload) =>  {
			console.log("Dial has failed");
			process.exit(0);
		});

	// Awaits 10 seconds to prepare...
	setTimeout(() => {
		baseEventDispatcher.dispatch(eventName, {
			destination,
			number,
			code,
			call_id: dialUniqueCode,
			type: DialerStatus.FAILURE
		});
	}, 100000);
};

/**
 * @description Called when a dial succeed, then call  will be delegated.
 * @param {Object} payload 
 * @param {String} dialUniqueCode
 * @param {Number} code 
 */
const dialSuccessEvent = function(payload, dialUniqueCode, code) {

	const { number, destination } = payload;

	const eventName = `${DialerStatus.SUCCESS}_${dialUniqueCode}`;

	baseEventDispatcher
		.watch(eventName, (payload) => prepareNewCall(payload, true));

	// Awaits 10 seconds to prepare...
	setTimeout(() => {
		baseEventDispatcher.dispatch(eventName, {
			destination,
			call_id: dialUniqueCode,
			type: DialerStatus.SUCCESS,
			direction: 'inbound',
			timestamp: new Date().toISOString(),
			number: number,
			code,
			our_number
		}, 0);
	});

};

/**
 * This method attempts to call numbers till it succeed with one of them.
 * @param {Array} clients 
 * @param {Number} i 
 */
const attempt = function(clients, i) {

	try {
		for(let client of clients) {

			console.log('Trying to dial number: ', client.number);

			if(client.number.length < 8 || client.number.match(/\D/g)) {
				throw Error('Number does not have correct pattern');
			}

			console.log('Dial succeeded with number: ', client.number);

			return { client, success: true, message: 'success dialing' };
		}
	} catch (error) {
		console.log('Failed to dial number: ', clients[0].number);
		/** Call recursively till it reaches number max of attempts */
		if(i >= clients.length) {
			return { error: true, message: 'Maximum attempts reached' };
		}

		console.log('\nRetrying...\n');
		i += 1;
		setTimeout(() => attempt(clients.slice(1, clients.length), i), i * 1000);
	}

};


module.exports = { dialSuccessEvent, dialFailureEvent, attemptEvent };