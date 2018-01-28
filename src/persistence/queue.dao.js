const { writeFileAsync, readFileAsync } = require('../utils/fs.promised');
const { QueueType } = require('../status/queue.type');
const { resolve } = require('path');


// TODO: Fix ENV Call
const env = require('../config/env.json')[process.env.ENV ? process.env.ENV : 'DEV'];

/**
 * 
 * @param {Object} client
 * @param {Number} queueType 
 */
const enqueue = async function(client, queueType) {

	//Path to persistence file destinated to clients accoring to parameter queue type
	const path = queueType === QueueType.NEW_CLIENT ? env['NEW_QUEUE_PATH'] : env['RETURNING_QUEUE_PATH'];
	const resolvedPath = resolve(path);

	try {
		let queueStr = await readFileAsync(resolvedPath);
		let clientStr = `${JSON.stringify(client)}`;
        
		if(!queueStr) {
			return await writeFileAsync(resolvedPath, clientStr);
		}

		const queueList = queueStr.split('@@@');
        
		queueList.unshift(clientStr);

		return await writeFileAsync(resolvedPath, queueList.join('@@@'));

	} catch (error) {
		return error.message;
	}
};

/**
 * 
 * @param {Number} queueType 
 */
const dequeue = async function(queueType) {

	//Path to persistence file destinated to clients accoring to parameter queue type
	const path = queueType === QueueType.NEW_CLIENT ? env['NEW_QUEUE_PATH'] : env['RETURNING_QUEUE_PATH'];
	const resolvedPath = resolve(path);

	try {
		const queueList = await isEmpty(resolvedPath);
        
		const client = queueList.length === 0 ? null : queueList.shift();

		// resave queue after removing first element;
		await writeFileAsync(resolvedPath, queueList.join('@@@'));

		return client;

	} catch(error) {
		return error.message;
	}
};

/**
 * 
 * @param {Number} queueType 
 */
const isEmpty = async function(path) {
	const queueStr = await readFileAsync(path);

	if(!queueStr) return [];

	return queueStr.split('@@@');
};


module.exports = {
	isEmpty,
	enqueue,
	dequeue
};