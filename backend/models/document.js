const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    
    price : {
        type: Number,
        default:0
    },
    
    isFeatured: {
        type: Boolean,
        default: false,
    },
   
})

documentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

documentSchema.set('toJSON', {
    virtuals: true,
});


exports.Document = mongoose.model('Document', documentSchema);
