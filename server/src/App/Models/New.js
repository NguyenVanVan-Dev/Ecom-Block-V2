const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newSchema = new Schema({
    name: { 
        type: String, 
        required:[true , 'Please enter your name!' ]
    }, 
    email:{
        type: String,
        unique: true,
        required:[true , 'Please enter your email account!' ]
    },
},{
    timestamps:true
});

module.exports =  mongoose.model('New', newSchema);