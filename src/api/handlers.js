const bootstrap = require('../app');


const Api = function(io) {

    /**
     * @description Route that triggers calls.
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    const dial = function(req, res) {
        bootstrap(['11940289846', '11996763838']);

        res.status(200).json({
            status: "Call in progress",
            message: `Checkout its progress at http://localhost:8080/calls`
        })
    }

    const getCalls = async function(req, res) {
        res.render('dashboard', { title: "Calls Dashboard"});
    }

    const webhook = async function(req, res) {
        //TODO implement socket io
        io.emit('call-status', req.body);
        res.status(200).send({ data: req.body });
    }


    return {
        dial, getCalls, webhook
    }

}

module.exports = Api;