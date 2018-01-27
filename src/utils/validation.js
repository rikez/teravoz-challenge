

/**
 * @description Check number validity
 * @returns Returns array with valid numbers or just a sngile number.
 * @param {Array | Number} numb
 */
exports.validateNumbers = (numb) => {
	if(Array.isArray(numb))
		return numb.filter(n => n.length >= 10 && !n.match(/\D/g));
      
	return numb.length >= 10 && !numb.match(/\D/g) ? numb : false;
};