const { QueueType } = require('../status/queue.type');
const { persist, isAReturningClient } = require('../persistence/client.dao');
const baseEventDispatcher = require('../events/base.event.dispatcher')('dial');
const { v4 } = require('uuid');
const { codeGenerator } = require('../utils/code.generator');
const { attemptEvent } = require('../events/dial.event');


/**
 * @description Method responsible for call dial in background
 * @param {Array} clients 
 */
const dialEvent = function(clients) {
    baseEventDispatcher
        .watch("dialing", async (numbers) => {
            await dial(numbers)
        })
        .dispatch("dialing", clients);
}


/**
 * @description Method responsible for controlling dial flow
 * @param {Array} clients 
 */
const dial = async function(clients) {

    try {
        const validNumbers = await persist(clients);

        const [dialUniqueCode, code] = [v4(), codeGenerator(validNumbers[0])];

        const verifiedClients = [];


        for(let client of validNumbers) {
            verifiedClients.push({ returning: await isAReturningClient(client) ? 
                QueueType.RETURNING_CLIENT : QueueType.NEW_CLIENT, number: client });
        }

        attemptEvent(verifiedClients, { dialUniqueCode, code });

    } catch (error) {
        return error;
    }
}






module.exports = { dialEvent };