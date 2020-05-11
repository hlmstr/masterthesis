const mongoDBHandler = require('../dbHandlers/positionMongodbHandler');

exports.getPosition = async (req, res) => {
    const userID = req.query.userID
    const response = await mongoDBHandler.getPosition(userID)
    if(response){
        res.status(200).send(JSON.stringify(response));
    }
    else{
        res.status(400).send("Could not find User");
    }
};

exports.updatePosition = async (req,res) => {
    const userPosition = req.body.userPosition;
    const userID = req.body.userID;
    response = await mongoDBHandler.updatePosition(userPosition, userID);
    if(response){
        res.status(200).send(JSON.stringify(response));
    }
    else{
        res.status(400).sen("Could not update position");
    }
};

exports.getPositions = async (req,res) => {
    const userIDs = req.body.userIDs
    if(!userIDs.some(isNaN)){
        response = await mongoDBHandler.getPositions(userIDs);
        if(response){
            res.status(200).send(JSON.stringify(response));
        }
        else{
            res.status(400).send("could not fetch users positions");
        }
        res.status(400).send("invalid input")
    }
};

//this is the experiment3 function which returns a batch of users to be joined in api composer
exports.getRangeOfUsersPositions = async (req,res) => {
    let userLimit = parseInt(req.query.limit);
    let response = await mongoDBHandler.getRange(userLimit);
    if(response){
        res.status(200).send(JSON.stringify(response));
    }
    else{
        res.status(400).send("could not fetch batch");
    }
};