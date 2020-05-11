const thirdpartyservice1 = require('../thirdPartyServices/thirdPartyService1'); 
const mongodbHandler = require('../dbHandlers/thirdPartyMongdbHandler')
exports.handle = async (userPosition, userSubscriptions) => {

    const responseArray = await userSubscriptions.map( async subscription => {
        const servicePosition = await mongodbHandler.getServicePosition(subscription.serviceID)
        if(!checkUserDistanceToService(userPosition,servicePosition.position, subscription.settings.distance)){
            return  {
                serviceID: subscription.serviceID,
                queueTime: "NA",
                location: "mock",
                message: "not within distance of interest" ,
                alert: false
            };
        }
        if(subscription.serviceID == 0){
            //call service 0
        }
        if(subscription.serviceID == 1){
            return await thirdpartyservice1.handle(subscription)
        }
        if(subscription.id == 2){
            //call service 2
            return {
                serviceID: subscription.serviceID,
                queueTime: "NA",
                location: "mock",
                message: "no available" ,
                alert: false
            }
        }
        if(subscription.id == 3){
            //call service 3.....
        }
        else{
            return {
                serviceID: subscription.serviceID,
                queueTime: "NA",
                location: "mock",
                message: "user criteria not satisfied" ,
                alert: false
            };
        }

    });

    const response = await Promise.all(responseArray)
    return response;
}
const checkUserDistanceToService = (userPos, servicePos, distanceOfInterest) => {
    if(getDistanceFromLatLonInKm(userPos.lat,userPos.long,servicePos.lat,servicePos.long) < distanceOfInterest){
        return false
    } 
    return true
}


const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }