module.exports = function install(){

    // set squeeze host
    gladys.param.setValue({ name: 'SQUEEZEBOX_HOST', value: 'http://192.168.1.60' })
    	.then((result) => {
            sails.log.debug(`Squeezebox module configuration succeed : parameter SQUEEZEBOX_HOST added.`);
    	})
        .catch(function (err) {
            sails.log.error(`Squeezebox module configuration failed : ` + err);
        });

    // set squeeze mp3 folder
    return gladys.param.setValue({ name: 'SQUEEZEBOX_MP3_FOLDER', value: '/mnt/diskstation/music' })
    	.then((result) => {
            sails.log.debug(`Squeezebox module configuration succeed : parameter SQUEEZEBOX_MP3_FOLDER added.`);
    	})
        .catch(function (err) {
            sails.log.error(`Squeezebox module configuration failed : ` + err);
        });
};