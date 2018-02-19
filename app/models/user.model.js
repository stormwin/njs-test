const mongoose = require('mongoose'),
    crypto = require('crypto'),
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
        type: String,
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
        crypto.pbkdf2(this.password, 'someSaltHere', 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) return next(err);
            this.password = derivedKey.toString('hex');
            next();
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
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, 'someSaltHere', 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) return reject(err);

            if(this.password === derivedKey.toString('hex')) {
                return resolve();
            }

            return reject();
        });
    });
};


// Register schema
mongoose.model('User', UserSchema);