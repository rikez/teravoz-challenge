const { QueueType } = require( '../status/queue.type');
const { findOrPersist } = require('../persistence/client.dao');
const { v4 } = require('uuid');
const baseEventDispatcher = require('../events/base.event.dispatcher')('call');
const { CallStatus } = require('../status/call.status');
const { question } = require('../utils/readline.helper');
const { validateNumbers } = require('../utils/validation');
const strings = require('../config/strings.json');
const { prepareNewCall } = require('../events/call.event');

const env = require('../config/env.json')[process.env.ENV ? process.env.ENV : 'DEV'];

const our_number = env.OUR_NUMBER;

/**
 * @description Call initializer picks a call from receptionist an makes questions to client on line.
 * @param {String} q
 */
const callInitializer = (q = strings.getPhoneNumber) => {
	question('\n' + q.cyan + ' ', (number) => {
		if(!validateNumbers(number)) {
			return callInitializer(strings.wrongFormatPhone);
		}

		checkClientExistsAndDispatchCall(number);
	});
};


/**
 * @description start call flow.
 * @param {Number} number
 */
const checkClientExistsAndDispatchCall = async (number) => {

	const call_id = v4();
	const eventName = `${CallStatus.NEW}_${call_id}`;

	const { exists } = await findOrPersist(number);
    
	baseEventDispatcher
		.watch(eventName, (payload) => prepareNewCall(payload))
		.dispatch(eventName, { 
			call_id, 
			type: CallStatus.NEW, 
			direction: 'inbound', // means it 's external.
			number,
			our_number,
			destination: exists ? QueueType.RETURNING_CLIENT : QueueType.NEW_CLIENT,
			timestamp: new Date().toISOString() 
		}, 0);


};



module.exports = { callInitializer };