

/**
 * @description Number generator when call comes from a dialer
 * @param {Number} clientNumber 
 */
exports.codeGenerator = clientNumber => parseInt(Math.random() * parseInt(clientNumber) + 1, 10);