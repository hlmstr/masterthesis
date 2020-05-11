const userController = require("../controllers/userController.js");
const subscriptionController = require("../controllers/subscriptionController.js");
const positionController = require("../controllers/positionController.js")
const thirdPartyServiceController = require("../controllers/thirdPartyController.js")

const path = require('path');


module.exports = (app) => {
    app.route('/').get((req,res)=>{
      res.sendFile(path.join(__dirname + "/routes_readme.html"))
    })


    app.route('/users')
      .get(userController.getRangeOfUsers) //gets batch for experiment 3
      .post(userController.getUsers); // gets users from a list

    app.route('/user')
      .get(userController.getUser); // gets one user
    
    // manage users subscriptions - get all subsciptions of a user - subscribe to a service for a user.
    app.route('/subscription')
      .get(subscriptionController.getUserSubscriptions)
      .post(subscriptionController.subscribe)
      .delete(subscriptionController.unsubscribe);

    app.route('/subscriptions')
      .get(subscriptionController.getRangeOfUsersSubscriptions) 
      .post(subscriptionController.getUsersSubscriptions)
    // manage positions - get the last known position of a user - insert a new position for a user.
   
    app.route('/position')
      .get(positionController.getPosition)
      .post(positionController.updatePosition);

    app.route('/positions')
      .get(positionController.getRangeOfUsersPositions)
      .post(positionController.getPositions);

    app.route('/service')
      .get(thirdPartyServiceController.getService) 
      .post(thirdPartyServiceController.addService) 
      .put(thirdPartyServiceController.changeServiceStatus);

    app.route('/services')
      .get(thirdPartyServiceController.getAllServices)
      .post(thirdPartyServiceController.getServices)

    app.route('/checksubscriptions')
      .post(thirdPartyServiceController.checkSubscriptions);
  };



