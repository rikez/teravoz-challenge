const readline = require('readline').createInterface(process.stdin, process.stdout);


/**
 * @description Capture console answers to questions
 * @param {String} question 
 * @param {Function} cb 
 */
const question = function(question, cb) {
	readline.question(question, cb);
};

module.exports = { question };
