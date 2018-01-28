
require('colors');
require('dotenv').config();

const { callInitializer } = require('./actions/call.action');
const { cleanAllPersistentFile } = require('./utils/file.cleaner');

// DO all the cleanup.
process.on('exit', () => {
	cleanAllPersistentFile();
});
process.on('SIGINT', () => {
	cleanAllPersistentFile();
});


callInitializer();

