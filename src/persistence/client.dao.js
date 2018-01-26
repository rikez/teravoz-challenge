const { writeFileAsync, readFileAsync } = require('../utils/fs.promised');
const { validateNumbers } = require('../utils/validation');
const env = require('../config/env.json');


/**
 * @description Method saves client in filesystem, also checks if exists
 * @param {Array} data 
 */
const persist = async function(data) {

    if(!Array.isArray(data)) throw new Error("Data must be an array of numbers");
    
    const path = env.CLIENT_PATH;

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
        return error.message;
    }
}

/**
 * @description Method returns an array with all clients
 */
const getAll = async function() {

    const path = env.CLIENT_PATH;
    
    try {
        const clientStr = await readFileAsync(path);

        if(!clientStr) return [];
        

        return clientStr.split(',');

    } catch(error) {
        return error.message
    }
}

/**
 * @description Obtain client by number.
 * @param {String} number 
 */
const getByNumber = async function(number) {
    
    const path = env.CLIENT_PATH;
    
    try {

        const clientStr = await readFileAsync(path);

        if(!clientStr) return [];

        const clientList = clientStr.split(',');

        const searchResult = clientList.filter(numb => numb === number.toString());

        return searchResult;
    } catch(error) {
        return error.message
    }
}

/**
 * 
 * @param {String} number 
 */
const isAReturningClient = async function(number) {
    let exists = await getByNumber(number);

    return exists.length > 0 ? true : false;
}


module.exports = {
    getByNumber, 
    persist, 
    getAll,
    isAReturningClient
}