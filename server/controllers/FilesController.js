var encryption = require('../utilities/encryption'),
    fileOperations = require('../utilities/fileOperations'),
    files = require('../data/files'),
    CONTROLLER_NAME = 'files',
    URL_PASSWORD = 'magic unicorns pesho gosho1',
    uploadedFiles = [];

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if(dd < 10){
        dd='0'+dd
    }

    if(mm < 10){
        mm= '0'+mm
    }

    return dd + '-' + mm + '-' + yyyy;
}

module.exports = {
    getUpload : function(req, res, next) {
        res.render(CONTROLLER_NAME + '/uploadForm');
    },
    uploadFiles: function(req, res, next) {
        req.pipe(req.busboy);

        var username = req.user.username;

        req.busboy.on('file', function (fieldname, file, filename) {
            var fileNameHashed = encryption.generateHashedPassword(encryption.generateSalt(), filename);
            var currentDate = getDate();
            var path = '/' + username + '/' + currentDate + '/';
            var url = path + fileNameHashed;
            var urlEncrypted = encryption.encrypt(url, URL_PASSWORD);
            fileOperations.saveFile(file, path, fileNameHashed);
            uploadedFiles[username] = uploadedFiles[username] || [];
            uploadedFiles[username][fieldname] = uploadedFiles[username][fieldname] || {};
            var dbFile = uploadedFiles[username][fieldname];
            dbFile.url = urlEncrypted;
            dbFile.fileName = filename;
            dbFile.username = req.user.username;
        });

        req.busboy.on('field', function(fieldname, val) {
            var index = fieldname.split('_')[1];
            uploadedFiles[username] = uploadedFiles[username] || [];
            uploadedFiles[username]['file_' + index] = uploadedFiles[username]['file_' + index] || {};
//            uploadedFiles[username]['userName'] = username;
            var dbFile = uploadedFiles[username]['file_' + index];
            dbFile.isPrivate = !!val;
        });

        req.busboy.on('finish', function() {
            files.addFiles(uploadedFiles[username]);
            res.redirect('/uploaded-files');
        });
    },
    getUploadedFiles : function (req, res, next) {
        files.getFiles(req.user.username, function(err, data) {
            res.render(CONTROLLER_NAME + '/uploadedFiles', {files: data});
        });
    },
    download: function (req, res, next) {
        var url = req.params.id;
        var decryptedUrl = encryption.decrypt(url, URL_PASSWORD);
        res.download(__dirname + '/../../files' + decryptedUrl);
    }
};