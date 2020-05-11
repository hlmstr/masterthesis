//import of mongoose
const connection = require('./mongoConnection');
const UserModel = require('../models/usermodelschema');

exports.getUserSubscriptions = async (userID) => {
    var query = await UserModel.find({'userID': userID},'userID subscriptions',(err,res)=>{
        if(err){
            console.log("no match was found user subscriptions or matching user where found")
        }
    });

    return query;
}

exports.getUsersSubscriptions = async (userIDs) => {
    var query = await UserModel.find(
        {'userID': {$in : userIDs}},'userID subscriptions' , 
            (err, res) => {
                if(err){
                    console.log("error in finding user position")
                }
    }).catch(err=>{
        console.log(err.message)
    });

    return query;

}

exports.subscribe = async (userID, serviceObject) => {   

    let query = await UserModel.findOneAndUpdate(
        {'userID':userID, 'subscriptions.serviceID':{$ne: serviceObject.serviceID}}, 
        {$push: {'subscriptions': serviceObject}},
        {new: true,
        "fields": {"subscriptions": 1, "userID": 1},
        }
    )
    if(query){
        return query
    } else {
        return null
    }
};
exports.unsubscribe = async (userID, serviceID) => {
    const query = await UserModel.findOneAndUpdate(
        {'userID': userID, 'subscriptions.serviceID': serviceID},
        {$pull :{
            subscriptions: {'serviceID': serviceID} 
        }},
        {new: true}
    )
    return query;
}

exports.getRange = async (limit) => {
    const query = await UserModel.find({userID: {$lt: limit}},'userID subscriptions',(err,res)=>{
        if(err){
            console.log("error in finding users:", err.message)
        }
    }).limit(limit);
    return query;
};

