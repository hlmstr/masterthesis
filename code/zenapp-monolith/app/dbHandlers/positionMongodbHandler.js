//import of mongoose
const connection = require('./mongoConnection');

const UserModel = require('../models/usermodelschema');


exports.getPosition = async (userID) => {
    const userPosition = await UserModel.find({'userID': userID},"userID position", (err,res) => {
        if(err){
            console.log("error in finding user position")
        }
        if(!res){
            console.log("no matching user where found for updating the position")
        }
    }).catch((err)=>{
        console.log(err.message)
    });
    return userPosition;
}

exports.updatePosition = async (positionObject, userID) => {
    positionObject['timestamp']= Date.now();
    var user = await UserModel.findOneAndUpdate(
        {'userID': userID},  
        {'position' : positionObject }, 
        {new: true,
        "fields": {"userID": 1, "position": 1}},
        (err,res) => {
            if(err){
                console.log("error in updating user position")
            }
            if(!res){
                console.log("no user were found")
            }
        }).catch((err)=>{
            console.log(err.message)
        });
    return user; 
}

exports.getPositions = async (userIDs) => {
        var query = await UserModel.find(
            {'userID': {$in : userIDs}}, "userID position", 
                (err, res) => {
                    if(err){
                        console.log("error in finding user position")
                    }
                    if(!res){
                        console.log("no matching user where found for updating the position")
                    }
        }).catch(err=>{
            console.log(err.message)
        });
        return query;
};

exports.getRange = async (limit) => {
    const query = await UserModel.find({userID: {$lt: limit}}, (err,res)=>{
        if(err){
            console.log("error in finding users:", err.message)
        }
    }).limit(limit);
    return query;
};