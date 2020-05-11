 
const API_URL = "http://ddbiltvattar.se/index2.php";



exports.handle = async (subscription) => {

    let queuetimeSetting = subscription.settings.queuetime;
    const queuetime = 11;

    if(Number(queuetime) < queuetimeSetting){
        return {
            serviceID: subscription.serviceID,
            queueTime: queuetime,
            location: "carwash1",
            message: "Time for carwash" ,
            alert: true
        } 
    } else {
        return {
            serviceID: subscription.serviceID,
            queueTime: queuetime,
            location: "carwash1",
            message: "Queuetime to long" ,
            alert: false
        }   
    }
}


