const { EventEmitter } = require('events');
const Axios = require('axios');
const { logEventTriggered, logApiErrors } = require('../utils/logger');


class BaseEventDispatcher extends EventEmitter {

	/**
     * @description Set value to watcher n dispatcher prefix eventName.
     * @param {String} eventPrefix 
     */
	constructor(eventPrefix) {
		super();
		this.eventPrefix = `${eventPrefix}/`; 
	}

	/**
     * @description Listens to event n waits only once.
     * @param {String} eventName 
     * @param {Function} listener 
     */
	watch(eventName, listener) {
		this.once(this.eventPrefix + eventName, listener);
		return this;
	}

	/**
     * @description Event dispatcher.
     * @param {String} eventName 
     * @param {Object} payload 
     * @param {Number} delay
	 * @param {Boolean} ignoreRequest
     */
	dispatch(eventName, payload, delay = 3000, ignoreRequest = false) {

		if(ignoreRequest) {
			this.emit(this.eventPrefix + eventName, payload);
			return;
		}

		Axios.post('http://localhost:8080/v1/api/webhook', payload)
			.then(response => {
            
				setTimeout(() => {
					logEventTriggered(payload.type, delay);

					this.emit(this.eventPrefix + eventName, payload);
				}, delay);
			})
			.catch(err => {
			    logApiErrors('API must be running to accomplish calls');
			    process.exit(0);
			});
	}
}

module.exports = prefix => {
	return new BaseEventDispatcher(prefix);
};