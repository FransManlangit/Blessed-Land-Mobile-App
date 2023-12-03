const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
  
    role: {
        type: String, 
        default: 'User',
    },
    
    image: {
        type: String,
        default: ''
    },
    
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();

});

userSchema.set('toJSON', {
    virtual: true, 
});
    
exports.User = mongoose.model('User', userSchema);

exports.userSchema = userSchema;