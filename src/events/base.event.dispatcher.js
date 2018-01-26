const { EventEmitter } = require('events');
const Axios = require('axios');


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
     */
    dispatch(eventName, payload, delay = 3000) {
        Axios.post('http://localhost:8080/v1/api/webhook', payload).then(response => {
            setTimeout(() => this.emit(this.eventPrefix + eventName, payload), delay);
        })
        .catch(err => console.log(err));
    }
}

module.exports = prefix => {
    return new BaseEventDispatcher(prefix);
}