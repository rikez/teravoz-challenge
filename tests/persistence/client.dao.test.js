const { assert } = require('chai');
require('dotenv').config();
process.env.ENV = 'TESTING';
const { findOrPersist, bulkPersist, getByNumber, getAll, isAReturningClient } = require('../../src/persistence/client.dao');

describe('Client DAO Module', () => {

		describe('findOrPersist Method Testing', () => {
			it('Should return Object', async () => {
				const actual = await findOrPersist('11940289846');
				assert.isObject(actual);
			});

			it('Should return exists true and pesisted false, cause phone exists', async () => {
				const actual = await findOrPersist('11940289846');
				const expected = {exists: true, persisted: false};
				assert.deepEqual(expected, actual);
			});

		});

		describe('bulkPersist Method Testing', () => {

			it('Should return the valid persisted numbers passes', async () => {
				const actual = await bulkPersist(['11940289846', '123123', '456789']);
				const expected = ['11940289846'];
				assert.deepEqual(expected, actual);
			});
		});

		describe('getByNumber Method Testing', () => {

			it('Should return an empty array if number does not exist or argument is invalid', async () => {
				const actual = await getByNumber(['3232']);
				const expected = [];
				assert.deepEqual(expected, actual);
			});
		});

		describe('getAll Method Testing', () => {

			it('Should return an array', async () => {
				const actual = await getAll();
				assert.isArray(actual);
			});

		});

	describe('isAReturningClient Method Testing', () => {

		it('Should return true if is client exists and false if not', async () => {
			const actual = await isAReturningClient('123456');
			const expected = false;
			assert.equal(expected, actual);
		});

	});



});