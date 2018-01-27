const { assert } = require('chai');
require('dotenv').config();
process.env.ENV = 'TESTING';
const env = require('../../src/config/env.json')['TESTING'];
const { persist, getAll } = require('../../src/persistence/calls.dao');

describe('Calls DAO Module', () => {

	describe('Persist Method Testing', () => {
		it('Should return ok string if persisted', async () => {
			const actual = await persist({number: '11940289846', destination: 901, call_id: 'sadas-3213'}, 901);;
			const expected = 'ok';
			assert.equal(expected, actual);
		});
	});

	describe('getAll Method Testing', () => {

		it('Should return an Array of calls', async () => {
			const actual = await getAll();
			assert.isArray(actual)
		});

	});



});