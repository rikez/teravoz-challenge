const { assert } = require('chai');
require('dotenv').config();
process.env.ENV = 'TESTING';
const env = require('../../src/config/env.json')['TESTING'];
const { dequeue, enqueue, isEmpty } = require('../../src/persistence/queue.dao');

describe('Queue DAO Module', () => {

	describe('Enqueue Method Testing', () => {
		it('Should return ok string if enqueued', async () => {
			const actual = await enqueue({number: '11940289846', destination: 901, call_id: 'sadas-3213'}, 901);;
			const expected = 'ok';
			assert.equal(expected, actual);
		});
	});

	describe('Dequeue Method Testing', () => {

		it('Should return Object', async () => {
			const actual = await dequeue(901);
			assert.isObject(JSON.parse(actual));
		});

	});

	describe('IsEmpty Method Testing', () => {

		it('Should return empty array', async () => {
			const path = env['RETURNING_QUEUE_PATH']; //901
			const actual = await isEmpty(path);
			const expected = 0;

			assert.equal(0, actual.length);
		});
	});



});