module.exports = function(sails) {

	const scan = require('./lib/scan.js');
    const init = require('./lib/init.js');
	const exec = require('./lib/exec.js');

	gladys.on('ready', function(){
        scan();
        init();
    });

	return {
        scan,
        exec
    };
};