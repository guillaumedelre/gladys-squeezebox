const shared = require('./shared.js');
const fs = require('fs');
const scanFolder = require('./scanFolder');
const Player = require('player');

module.exports = function init(){

    return gladys.param.getValue('SQUEEZEBOX_MP3_FOLDER')
        .then((squeezeboxFolder) => {
            sails.log.debug(`Squeezebox mp3 folder is ${squeezeboxFolder}.`);
            
            shared.folder = squeezeboxFolder;

            shared.player = new Player();

            return scanFolder();  
        })
        .catch(function(err) {
            sails.log.error(`Squeezebox module error : ` + err);
        });
};