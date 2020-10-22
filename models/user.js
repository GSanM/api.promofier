const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

var structure = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: false
    }
});

//Hash the password before save 
structure.pre('save', function(next) {
    var user = this;

    //Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    //Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //Hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            //Override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

structure.set('timestamps', true);
module.exports = promofier.model('user', structure);