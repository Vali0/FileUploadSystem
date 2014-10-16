var User = require('mongoose').model('User');

module.exports = {
    create: function(user, callback) {
        User.create(user, callback);
    },
    update: function(id, user, callback) {
        User.update(id, user, callback);
    },
    findOne: function(username, callback){
        User.findOne({username: username}, callback);
    }
};