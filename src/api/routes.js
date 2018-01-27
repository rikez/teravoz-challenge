const API = require('./handlers');


/**
 * @description Route mapping method
 * @param {Express.app} app 
 * @param {Socket.io} io 
 */
module.exports = function(app, io) {
	const routes = [
		{
			method: 'post',
			path: '/dial',
			handler: API(io).dial,
			middleware: []
		},
		{
			method: 'post',
			path: '/webhook',
			handler: API(io).webhook,
			middleware: []
		},
		{
			method: 'get',
			path: '/calls',
			ignoreBaseRoute: true,
			handler: API(io).getCalls,
			middleware: []
		},
		{
			method: 'get',
			path: '/events',
			ignoreBaseRoute: true,
			handler: API(io).getEvents,
			middleware: []
		}
	];

	const baseRoute = app.get('baseRoute');

	routes.map(route => {
		app[route.method](
			route.ignoreBaseRoute ? route.path : baseRoute + route.path,
			route.middleware ? route.middleware : [],
			route.handler);
	});

};
