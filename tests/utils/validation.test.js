const assert = require('assert');
const { validateNumbers } = require('../../src/utils/validation');

describe('Testing Validation Module', () => {

	describe('Testing ValidateNumbers Method' , () => {

		it('Should return false when invalid single number is passed', () => {
			const actual = validateNumbers('11234');
			assert.equal(false, actual);
		});

		it('Should return number itself when single valid number is passed', () => {
			const expected = '11940289846';
			const actual = validateNumbers(expected);
			assert.equal(expected, actual);
		});

		it('Should return array with valid numbers when array with numbers are passed', () => {
			const data = ['11940289846', '11996763838', '11123', 'asd'];
			const actual = validateNumbers(data);
			const expected = ['11940289846', '11996763838'];
			assert.deepEqual(expected, actual, "Arrays have same values in its references");
		});

		it('Should return an empty array when only invalid numbers are passed', () => {
			const data = ['11123', 'asd'];
			const actual = validateNumbers(data);
			const expected = 0;
			assert.equal(expected, actual.length);
		});

		it('Should return false when a string is passed ', () => {
			const data = 'asd';
			const actual = validateNumbers(data);
			const expected = false;
			assert.equal(expected, actual);
		});

	})


});