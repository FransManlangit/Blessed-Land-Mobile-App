const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({

    requestItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RequestItem',
        required:true
    }],

    fullname: {
        type: String,
        required: true,
    },

    studentId: {
        type: String,
        required: true,
    },
    

    grade: {
        type: String,
        required: true,
    },

    section: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    purpose: {
        type: String,
        required: true,
    },

    dateofRequest: {
        type: Date,
        default: Date.now,
    },

    status: {
        type: String,
        required: true,
        default: 'Pending',
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    payment: {
        type: String,
        required: true,
    },

    totalPrice: {
        type: Number,
      
    }
  
})

requestSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

requestSchema.set('toJSON', {
    virtuals: true,
});

exports.Request = mongoose.model('Request', requestSchema);