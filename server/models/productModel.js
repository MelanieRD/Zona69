const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number
    },
    description:{
        type: String,
    },
    countInStock:{
        type: Number,
    },
    imageUrl:{
        type: String,
    },
    color:{
        type: String,
    },
    size:{
        type: String,
    },
    rating:{
        type: Number,
    },
    categoryTags:[
        {
            type: String,
        }
    ]
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Product', productSchema);