const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserModelSchema = new Schema({
    userID: {
        type: Number,
        unique: true,
        required: true
    },
    name:{ 
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
    },
    userLevel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    subscriptions: [
        {
            _id: false,
            serviceID: Number,
            settings: Object
        }
    ],    
    position:{
        _id: false,
        timestamp: {
            type: Number,
            default: Date.now(),
            required:true
        },
        lat: {
            type: Number,
            default: null
        },
        long: {
            type: Number,
            default: null
        }
    }
   
});
var UserModel = mongoose.model('UserModel', UserModelSchema);

module.exports = UserModel;