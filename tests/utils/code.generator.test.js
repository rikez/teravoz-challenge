const { assert } = require('chai');
const { codeGenerator } = require('../../src/utils/code.generator');

describe('Code Generator Module/Method', () => {

		it('Should throw an exception when client number parameter is not passed', () => {
			assert.throws(codeGenerator, Error);
		});

		it('Should return an integer when parameter is passed', () => {
			const actual = codeGenerator('11940289846');
			assert.isNumber(actual);
		});

});