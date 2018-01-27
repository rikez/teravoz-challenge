const { writeFileAsync, readFileAsync } = require('../utils/fs.promised');
const env = require('../config/env.json')[process.env.ENV ? process.env.ENV : 'DEV'];

const path = env.CALLS_PATH;

/**
 * @description Method saves call in filesystem
 * @param {Object} data
 */
const persist = async function(data) {
	if(typeof data !== 'object') throw new Error('Data must be of object type');

	try {
		let callsStr = await readFileAsync(path);

		if(!callsStr) {
			return await writeFileAsync(path, JSON.stringify(data));
		}

		const callsList = callsStr.split('@@@');

		callsList.push(JSON.stringify(data));

		return await writeFileAsync(path, callsList.join('@@@'));

	} catch (error) {
		return error;
	}
};

/**
 * @description Method returns an array with all clients
 * @returns clients
 */
const getAll = async function() {

	try {
		const callsStr = await readFileAsync(path);

		if(!callsStr) return [];


		return callsStr.split('@@@');

	} catch(error) {
		return error;
	}
};



module.exports = {
	persist,
	getAll,
};