const mongoDBHandler = require('../dbHandlers/userMongodbHandler');

exports.getRangeOfUsers = async (req,res) => {
    let userLimit = parseInt(req.query.limit);
    let response = await mongoDBHandler.getRange(userLimit);
    if(response){
        res.status(200).send(JSON.stringify(response));
    }
    else{
        res.status(400).send("could not fetch batch");
    }
}

exports.getUser = async (req, res) =>{
    const userID = req.query.userID
    if(!isNaN(userID)){
        let response = await mongoDBHandler.getUser(userID);
        if(response){
            res.status(200).send(JSON.stringify(response));
        }
        else{
            res.status(400).send("user not found");
        }
    } else {
        res.status(400).send("invalid userID")
    }
}

exports.getUsers = async (req,res) => {
    const userIDs = req.body.userIDs;
    if(!userIDs.some(isNaN)){
        const users = await mongoDBHandler.getUsers(userIDs);
        if(users){
            res.status(200).send(JSON.stringify(users));
        }
        else{
            res.status(400).send("Could not find users");
        }
    } else {
        return res.status(400).send("invalid userid input");
    };
}