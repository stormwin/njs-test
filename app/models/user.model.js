const mongoose = require('mongoose'),
    argon2 = require('argon2'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    imageURL: {
        type: String,
        required: false
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: false
    }
});

// Do before save if password is changed or new
UserSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        argon2.hash(this.password)
            .then(hash => {
                this.password = hash;
                return next();
            }).catch(err => {
                return next(err);
            });
    } else {
        return next();
    }
});


// We do not want to have __v property in plain objects and json
UserSchema.set('toJSON', { getters: true, virtuals: true, versionKey: false });
UserSchema.set('toObject', { getters: true, virtuals: true, versionKey: false });



// Define method for authentication
UserSchema.methods.authenticate = function (password) {
    return argon2.verify(this.password, password);
};


// Register schema
mongoose.model('User', UserSchema);