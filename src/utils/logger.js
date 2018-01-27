const env = require('../config/env.json')[process.env.ENV ? process.env.ENV : 'DEV'];

/**
 * @description Logs called events if debug is on
 * @param {String} eventType 
 * @param {Number} delay 
 */
exports.logEventTriggered = function(eventType, delay) {
	if(env.DEBUG_EVENTS)
		console.warn('\n DEBUG_ON: '.red + 'Event %s was called after %sms\n'.green, eventType.toUpperCase(), delay);
};

/**
 * @description Logs delegated calls if debug is on
 * @param {String} callId 
 * @param {Number} number 
 * @param {Number} queueType 
 */
exports.logCallWasDelegated = function(callId, number, queueType) {
	if(env.DEBUG_EVENTS)
		console.warn('\nCall %s with number %s, was delegated to queue %s\n'.yellow, callId, number, queueType);
};

/**
 * @description Logs call record is available
 * @param {String} callId 
 * @param {Number} number 
 * @param {Number} queueType 
 */
exports.logCallRecordAvailable = function(callId, url) {
	if(env.DEBUG_EVENTS)
		console.warn('\nCall %s record with is already available at \n * %s\n'.blue,
			callId, url);
};

exports.logApiErrors = function(error) {
	if(env.DEBUG_EVENTS)
		console.warn('\n DEBUG_ON: %s \n'.red, error);
};