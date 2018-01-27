const { writeFileAsync, readFileAsync } = require('../utils/fs.promised');
const { validateNumbers } = require('../utils/validation')
const env = require('../config/env.json')[process.env.ENV ? process.env.ENV : 'DEV'];
const strings = require('../config/strings.json');
const path = env.CLIENT_PATH;

/**
 * @description Method saves clients in filesystem, also checks if exists, used by dial actions
 * @param {Array} data 
 */
const bulkPersist = async function(data) {

	if(!Array.isArray(data)) throw new Error('Parameter data must be an array of numbers');
    
	try {
		let clientStr = await readFileAsync(path);
        
		const validNumbers = validateNumbers(data);

		if(!clientStr) {     
			await writeFileAsync(path, validNumbers.join(','));
			return validNumbers;
		}

		const clientList = clientStr.split(',');
        
		for(let number of validNumbers) {
			let exists = await getByNumber(number);
			if(exists.length > 0) continue;

			clientList.push(number);
		}

		await writeFileAsync(path, clientList.join(','));

		return validNumbers;

	} catch (error) {
		return error;
	}
};

/**
 * @description Receives an number tries to find it or persist a new number.
 * @param {Number} number 
 * @returns {Object {exists, persisted}}
 * 
 */
const findOrPersist = async function(number) {
	if(!validateNumbers(number)) throw new Error(strings.wrongFormatPhone);
	try {
		const foundNumb = await getByNumber(number);

		// Does not exist, persist it.
		if(foundNumb.length === 0) {
			let clientStr = await readFileAsync(path);
			const clientList = clientStr.split(',').concat(number).join(',');
			await writeFileAsync(path, clientList);
			return { exists: false, persisted: true };
		}

		return { exists: true, persisted: false };

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
		const clientStr = await readFileAsync(path);

		if(!clientStr) return [];
        

		return clientStr.split(',');

	} catch(error) {
		return error;
	}
};

/**
 * @description Obtain client by number.
 * @param {String} number 
 */
const getByNumber = async function(number) {
    
	try {
		const clientStr = await readFileAsync(path);

		if(!clientStr) return [];

		const clientList = clientStr.split(',');

		const searchResult = clientList.filter(numb => numb === number.toString());

		return searchResult;
	} catch(error) {
		return error;
	}
};

/**
 * 
 * @param {String} number 
 */
const isAReturningClient = async function(number) {
	let exists = await getByNumber(number);

	return exists.length > 0 ? true : false;
};


module.exports = {
	getByNumber, 
	bulkPersist, 
	getAll,
	isAReturningClient,
	findOrPersist
};