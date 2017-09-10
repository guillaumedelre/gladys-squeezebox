const SqueezeServer = require('squeezenode');
const Promise = require('bluebird');

module.exports = function scan() {

    return gladys.param.getValue('SQUEEZEBOX_HOST')
        .then((squeezeboxHost) => {
            var squeeze = new SqueezeServer(squeezeboxHost, 9000);
            return new Promise(function(resolve, reject){
                squeeze.on('register', function(){
                    squeeze.getPlayers( function(collection) {
                        resolve(collection.result)
                    });
                });
            });
        })
        .then((data) => {
            return [data, gladys.machine.getMyHouse()];
        })
        .spread((players, house) => {

            return Promise.map(players, function(item){                
                var name = item.name;
                var identifier = item.playerid;
                
                // if no name has been found
                // don't save device
                if(!name) return null;

                return gladys.device.create({
                    device: {
                        name: name,
                        identifier: identifier + '-squeezebox',
                        protocol: 'telnet',
                        service: 'squeezebox'
                    },
                    types: [
                        {
                            name: name,
                            type: 'squeezebox',
                            category: 'music',
                            identifier: identifier + '-player',
                            sensor: false,
                            min: 0,
                            max: 0
                        }
                    ]
                });
            })
            .catch(function (err) {
                sails.log.error(`Squeezebox module failure :` + err);
            });
        })
        .catch(function (err) {
            sails.log.error(`Squeezebox module failure :` + err);
        });
};