//import of mongoose
const connection = require('./mongoConnection');
const UserModel = require('../models/usermodelschema');



exports.getUser = async (userID) => {

    const query = await UserModel.find({userID: userID}, (err,res)=>{
        if(err){
            console.log("error in getting user:", err.message)
        }
    })
    return query
};

exports.getRange = async (limit)  =>{
    const query = await UserModel.find({userID: {$lt: limit}}, (err,res)=>{
        if(err) {
            console.log("error in finding users:", err.message) 
        }
    }).limit(limit);
    return query;
}
exports.getUsers = async (userIDs) => {
    const query = await UserModel.find({userID: {$in :userIDs}}, (err,res)=>{
 
        if(err) {
            console.log("error in finding users:", err.message) 
        }
    })
    return query
}

 