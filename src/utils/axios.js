const axios = require('axios');
const env = require('../config/env.json');


module.exports = axios.create({
    baseUrl: `http://localhost:${env.PORT}/v1/api`
});