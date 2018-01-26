

/**
 * @description Check number validity
 * @returns Returns array with valid numbers
 * @param {Array} numbers
 */
exports.validateNumbers = (numbers) => {
    return numbers.filter(n => n.length > 8 && !n.match(/\D/g));
}