const scan = require('./scan.js');

module.exports = function init(){

    // get network scanner frequency
    return gladys.param.getValue('UPNP_FREQUENCY_IN_MINUTE')
        .then((upnpFrequency) => {

            sails.log.debug(`Upnp refresh each ${upnpFrequency} minutes.`);

            // scan at the given frequency
            setInterval(function(){
                scan();
            }, parseInt(upnpFrequency)*60*1000);
        });
};