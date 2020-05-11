const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ThirdPartyServiceModelSchema = new Schema({
    serviceID: {
        type: Number,
        unique: true},
    serviceName: String,
    serviceURL: String,
    serviceType: String,
    description: String,
    position: {
        lat: Number,
        long: Number,
    },
    active: Number,
    settings : []
});
var ThirdPartyServiceModel = mongoose.model('ThirdPartyServiceModel', ThirdPartyServiceModelSchema);

module.exports = ThirdPartyServiceModel;