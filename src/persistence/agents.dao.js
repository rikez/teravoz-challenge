const { ActorStatus, available } = require('../status/actor.status');
const { QueueType } = require('../status/queue.type');

const mockedAgents = [
	{
		name: 'Enrico Alvarenga',
		email: 'enricomalvarenga@gmail.com',
		available: ActorStatus.LOGGED_IN,
		queue: QueueType.RETURNING_CLIENT,
		number: 800
	},
	{
		name: 'Matheus Bordin',
		email: 'mabordin98@gmail.com',
		available: ActorStatus.LOGGED_IN,
		queue: QueueType.NEW_CLIENT,
		number: 804
	},
	{
		name: 'Beatriz Donghia',
		email: 'biadonghia@gmail.com',
		available: ActorStatus.LOGGED_IN,
		queue: QueueType.NEW_CLIENT,
		number: 803
	},
	{
		name: 'Andrea Rosany',
		email: 'arquitetura.andrearosany@gmail.com',
		available: ActorStatus.LOGGED_IN,
		queue: QueueType.RETURNING_CLIENT,
		number: 801
	}
];

/**
 * @description Method returns an avaiable Agent to pick the call, otherwise returns null.
 * @param {Number} queueType
 */
const getNextAgentAvailable = function(queueType) {

	const agent = mockedAgents.filter(ag => available(ag.available) && queueType === ag.queue);

	return agent.length === 0 ? null : agent.pop();
};


module.exports = {
	getNextAgentAvailable,
	mockedAgents
};
