const UpnpClient = require('node-upnp-client');
const Promise = require('bluebird');

module.exports = function scan() {

    // get the range of IP address
    return new Promise(function(resolve, reject){
            
            var cli = new UpnpClient();

            cli.searchDevices();

            cli.on('searchDevicesEnd', function() {
                resolve(cli);
            });
        })
        .then((data) => {
                // get house only if there is devices connected
                sails.log.debug(`UpnpClient refresh succeed :`);
                sails.log.debug(`- found ${data._servers.length} servers.`);
                sails.log.debug(`- found ${data._renderers.length} renderers.`);

                return [
                    data._servers,
                    data._renderers, 
                    gladys.machine.getMyHouse()
                ];
        })
        .spread((servers, renderers, house) => {

            // var data = servers + renderers;
            // console.log(data);

            return Promise.map(servers, function(item){
                
                var name = item.friendlyName;
                var identifier = item.id;
                
                // if no name has been found
                // don't save device
                if(!name) return null;

                return gladys.device.create({
                    device: {
                        name: name,
                        identifier: identifier,
                        protocol: 'upnp',
                        service: 'gladys-upnp'
                    },
                    types: []
                });
            });
        })
        .catch(function (err) {
            sails.log.error(`Upnp failed :` + err);
        });
};