const scan = require('./scan.js');

module.exports = function init(){

    // get network scanner frequency
    return gladys.param.getValue('LIFX_PLUS_FREQUENCY_IN_MINUTE')
        .then((lifxPlusFrequency) => {

            sails.log.debug(`lifxPlus Api will be call each ${lifxPlusFrequency} minutes.`);

            // scan at the given frequency
            setInterval(function(){
                scan();
            }, parseInt(lifxPlusFrequency)*60*1000);
        });
};