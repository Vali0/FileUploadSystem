var File = require('mongoose').model('File');

module.exports = {
    addFiles: function(files) {
        for(var file in files) {
            File.create(files[file]);
        }
    },
    getFiles: function(username, callback) {
        File.find({username: username}, callback);
    }
};