require('dotenv').config()
const { QueueType } = require('../status/queue.type');
const { bulkPersist, isAReturningClient } = require('../persistence/client.dao');
const baseEventDispatcher = require('../events/base.event.dispatcher')('dial');
const { v4 } = require('uuid');
const { codeGenerator } = require('../utils/code.generator');
const { attemptEvent } = require('../events/dial.event');


/**
 * @description Method responsible for call dial in background
 * @param {Array} clients 
 */
const dialEvent = function(clients) {
	baseEventDispatcher
		.watch('dialing', async (numbers) => {
			await dial(numbers);
		})
		.dispatch('dialing', clients, 1000, true);
};


/**
 * @description Method responsible for controlling dial flow
 * @param {Array} clients 
 */
const dial = async function(clients) {

	try {
		const validNumbers = await bulkPersist(clients);

		const [dialUniqueCode, code] = [v4(), codeGenerator(validNumbers[0])];

		const verifiedClients = [];


		for(let client of validNumbers) {
			verifiedClients.push({ returning: await isAReturningClient(client) ? 
				QueueType.RETURNING_CLIENT : QueueType.NEW_CLIENT, number: client });
		}

		attemptEvent(verifiedClients, { dialUniqueCode, code });

	} catch (error) {
		return error;
	}
};






module.exports = { dialEvent };