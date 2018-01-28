const { assert } = require('chai');
require('dotenv').config();
process.env.ENV = 'TESTING';
const env = require('../../src/config/env.json')['TESTING'];
const { getNextAgentAvailable, mockedAgents } = require('../../src/persistence/agents.dao');

describe('Calls DAO Module', () => {

	describe('GetNextAgentAvailable Method Testing', () => {

		it('Should return null when passing a non-existent queue type', async () => {
			const nonExistentQueueType = 999999999999;
			const actual = getNextAgentAvailable(nonExistentQueueType);
			const expected = null;
			assert.equal(expected, actual);
		});

		it('Should an Object with an agent', async () => {
			const nonExistentQueueType = 901;
			const actual = getNextAgentAvailable(901);
			assert.isObject(actual);
		});


		it('Should be an Object that contains agent/actor email', async () => {
			const nonExistentQueueType = 901;
			const actual = getNextAgentAvailable(901);
			const expected = 'email';
			assert.property(actual, expected);
		});

	});

	describe('mockedAgents Method Testing', () => {

		it('Should be an array', async () => {
			const actual = mockedAgents;
			assert.isArray(actual);
		});

		it('Should not be an empty array', async () => {
			const actual = mockedAgents;
			assert.isNotEmpty(actual);
		});


	});



});