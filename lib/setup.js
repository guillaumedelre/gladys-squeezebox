const SqueezeServer = require('squeezenode');
const Promise = require('bluebird');
const init = require('./init.js');
const scan = require('./scan.js');

module.exports = function setup(){

    return init()
		.then(() => scan())
		.then(() => {
            sails.log.debug(`Squeezebox module setup succeed.`);
		})
        .catch(function (err) {
            sails.log.error(`Squeezebox module failure :` + err);
        });
        
};