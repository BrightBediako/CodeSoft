const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
    },
    { timestamp: true }
);

UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            return next();
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            return next(err, false);
        }
        return next(null, match);
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
