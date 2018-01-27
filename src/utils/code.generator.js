

/**
 * @description Number generator when call comes from a dialer
 * @param {Number | String} clientNumber
 */
exports.codeGenerator = clientNumber => {

	if(!clientNumber) throw new Error('Client Number must be provided');

	return parseInt(Math.random() * parseInt(clientNumber) + 1, 10);
}