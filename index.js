module.exports = function(sails) {

	const scan = require('./lib/scan.js');
    const init = require('./lib/init.js');
    const install = require('./lib/install.js');
    const music = require('./lib/music/index.js');
    const setup = require('./lib/setup.js');

	gladys.on('ready', function(){
        init();
    });

	return {
        setup,
        music,
        scan,
        install
    };
};