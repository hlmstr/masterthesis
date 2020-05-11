const connection = require('./mongoConnection');
const ThirdPartyServiceModel = require('../models/thirdpartyservicemodel');

exports.getAllServices = async () => {
    const query = await ThirdPartyServiceModel.find({}, (err,res)=>{
        if(err) {
            console.log("error in callback:", err.message) 
        }
    })
    return query;
}

exports.getServices = async (serviceIDs) => {
    const query = await ThirdPartyServiceModel.find({'serviceID': {$in :serviceIDs}}, (err,res)=>{
        if(err){
            console.log("error in callback:", err.message)        }
    })
    return query
}

exports.getServicePosition = async (serviceID) => {
    const query = await ThirdPartyServiceModel.findOne({'serviceID': serviceID}, {serviceID:1, position:1}, (err,res)=>{
        if(err){
            console.log("error in callback:", err.message)        }
    })
    return query
}

exports.getService = async (serviceID) => {
    const query = await ThirdPartyServiceModel.find({'serviceID': serviceID})
    if(query.length == 0){
        return null
    }
        return query
}

exports.setServiceStatus = async (serviceID,status) => {
    var query = await ThirdPartyServiceModel.findOneAndUpdate({'serviceID': serviceID}, {'active': status}, {new:true}, (err, doc) => {
        if(err){
            console.log("error in updating")
        }
    })

    return query;
}

exports.addNewService = async (newServiceObject) => {
    const query = await ThirdPartyServiceModel.findOneAndUpdate(
        {'serviceID': newServiceObject.serviceID}, 
        newServiceObject, 
        {upsert:true, new:true}, 
        (err, res) => {
            if(err){
                console.log(err.message)
            }
        })
    return query
};