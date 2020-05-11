const mongoDBHandler = require('../dbHandlers/thirdPartyMongdbHandler');

//services
const serviceHandler = require('../thirdPartyServices/serviceHandler'); 

exports.getAllServices = async (req,res) => {
    let query = await mongoDBHandler.getAllServices();
    res.send(query);
}

exports.getService = async(req, res) => {
    const serviceID = req.query.serviceID;
    if(!isNaN(serviceID)){
        let query = await mongoDBHandler.getService(serviceID);

        if(query){
            res.status(200).send(query);
        } else {
            res.status(400).send("no results were found");
        }
    } else {
        res.status(200).send("invalid input");
    } 
}
exports.getServices = async (req,res) => {
    const serviceIDs = req.body.serviceIDs
    if(!serviceIDs.some(isNaN)){
        const serviceIDs = req.body.serviceIDs;

        let query = await mongoDBHandler.getServices(serviceIDs);

        if(query){
            res.status(200).send(query);
        } else {
            res.status(400).send("no results were found");
        }
    } else {
        res.status(200).send("invalid input");
    }
    
}

exports.addService = async (req, res) => {
    const service = req.body.service
    const response = await mongoDBHandler.addNewService(service)
    if(response){
        res.status(200).send("added service:" + response )
    }
    else{
        res.status(400).send("Falied to save")   
    }
}

exports.changeServiceStatus = async (req, res) =>{
    const serviceID = req.body.serviceID;
    const status = req.body.status
    response = await mongoDBHandler.setServiceStatus(serviceID, status)
    if(response){
        res.status(200).send("status updated")
    }
    else{
        res.status(400).send("Failed to update")
    }
}

exports.checkSubscriptions = async (req, res) => {
    let userSubscriptions = req.body.subscription;
    let position = req.body.position;
    const response = await serviceHandler.handle(position, userSubscriptions)

    if(response){
        res.status(200).send(response)
    }
    else{
        res.status(400).send("could not check subscriptions")
    }
    
}



