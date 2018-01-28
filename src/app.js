
require('colors');
require('dotenv').config();

const { callInitializer } = require('./actions/call.action');
const { cleanAllPersistentFile } = require('./utils/file.cleaner');

// DO all the cleanup.
process.on('exit', () => {
	cleanAllPersistentFile();
	process.exit(0);
});
process.on('SIGINT', () => {
	cleanAllPersistentFile();
	process.exit(0);
});


callInitializer();

