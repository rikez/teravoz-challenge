const { dialEvent } = require('../actions/dial.action');
const { getAll } = require('../persistence/calls.dao');


const Api = function(io) {

	/**
     * @description Route that triggers calls.
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
	const dial = function(req, res) {

		dialEvent(['11940289846', '11996763838', '11995651111', '1133849274']);

		res.status(200).json({
			status: 'Call in progress',
			message: 'Checkout its progress at http://localhost:8080/calls'
		});
	};

	const getCalls = async function(req, res) {
		const calls = await getAll();
		res.render('dashboard', { title: 'Calls', data: calls });
	};

	const getEvents = async function(req, res) {
		res.render('events', { title: 'Events' });
	};

	const webhook = async function(req, res) {
		// TODO: validate reqbody with Joi/Expres validation.
		io.emit('call-status', req.body);
		res.status(200).send({ data: req.body });
	};


	return {
		dial, getCalls, webhook, getEvents
	};

};

module.exports = Api;