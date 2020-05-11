const mongoDBHandler = require('../dbHandlers/subscriptionsMongodbHandler');

exports.getUserSubscriptions = async (req, res) => {
    const userID = req.query.userID
    const subscriptions = await mongoDBHandler.getUserSubscriptions(userID);
    if(subscriptions){
        res.status(200).send(JSON.stringify(subscriptions));
    }else{
        res.status(400).send("could not find user subscriptions");
    }
}

exports.getUsersSubscriptions = async (req, res) => {
    const userIDs = req.body.userIDs
    if(!userIDs.some(isNaN)){
        const response = await mongoDBHandler.getUsersSubscriptions(userIDs);
        if(response){
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send("could not fetch users' subscriptions");
        }
    } else {
        res.status(400).send("invalid input")
    }
}

exports.subscribe = async (req,res) => {
    let subscriptionobject = req.body.subscription
    let userID = req.body.userID;
    const response = await mongoDBHandler.subscribe(userID, subscriptionobject)
    if(response){
        res.status(200).send("Subscribes to service " + response);
    } else {
        res.status(400).send("allready subscriped to service");
    }
};

exports.unsubscribe = async (req,res) => {
    const userID = req.query.userID
    const serviceID = req.query.serviceID
    const response = await mongoDBHandler.unsubscribe(userID, serviceID)

    if(response){
        res.status(200).send("succesfully unsubscribed")
    }else{
        res.status(400).send("could not unsubscribe")
    }
}

exports.getRangeOfUsersSubscriptions = async (req,res) => {
    const userLimit = parseInt(req.query.limit);

    let response = await mongoDBHandler.getRange(userLimit);
    if(response){
        res.status(200).send(JSON.stringify(response));
    }
    else{
        res.status(400).send("could not fetch batch");
    }
}
