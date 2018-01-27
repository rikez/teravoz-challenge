const axios = require('axios');
const env = require('../config/env.json')[process.env.ENV];


module.exports = axios.create({
	baseUrl: `http://localhost:${env.PORT}/v1/api`
});