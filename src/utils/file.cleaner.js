const { writeFileAsync } = require('./fs.promised');
const { resolve } = require('path');


// TODO: Fix ENV Call
const env = require('../config/env.json')['DEV'];
const [ client, newQueue, retQueue, calls]  = [env.CLIENT_PATH, env.NEW_QUEUE_PATH, env.RETURNING_QUEUE_PATH, env.CALLS_PATH]

exports.cleanAllPersistentFile = () => {

	Promise.all([
		writeFileAsync(resolve(client), ''),
		writeFileAsync(resolve(newQueue), ''),
		writeFileAsync(resolve(retQueue), ''),
		writeFileAsync(resolve(calls), '')
	])
		.then(results => console.log(results))
		.catch(err => console.log(err));
}