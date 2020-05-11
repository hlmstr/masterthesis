var fs = require('fs')
var jsonArray = [];
const USER_OBJECT_LOWERBOUND = 0
const USER_OBJECT_HIGHERBOUND = 20000  
const SERVICE_LOWERBOUND = 1
const SERVICE_UPPERBOUND = 600

let usersArray = [];
let serviceArray = [];

services =["carwash", "postal service", "hair studio"];
let isActive = 1;

//EXPERIMENT 1


for(let i = USER_OBJECT_LOWERBOUND; i<USER_OBJECT_HIGHERBOUND; i++){
    let randomStatus = Math.floor(Math.random() * (4))

    userObject = {
        "userID": i,
        "name": {
            "firstname": 'user' + i, 
            "lastname": "lastnameson" + i,
        },
        "userLevel": i%2,
        "email": "user.lastnameson" + i+ "@email.com",
        "password": "123"+i,
        "subscriptions": [
            { "serviceID": i%5,
              "settings": {
                "queuetime": ((i%5)+1)*4,
                "distance": ((i%5)+1)
              }  
            },
            { "serviceID": (i+1)%5,
                "settings": {
                  "queuetime": ((i%6)+randomStatus)*3,
                  "distance": ((i%6)+2)
                }  
              },
              { "serviceID": (i+2)%5,
                "settings": {
                  "queuetime": ((i%7)+randomStatus)*3,
                  "distance": ((i%7)+3)
                }  
              },
        ],
        "position": {
            "lat": 58.391620,
            "long": 15.549027 + i % 3
        }
    }
    usersArray.push(userObject);
}

service = {
    "serviceID": 0,
    "serviceName": services[0] + 0,
    "serviceURL": "http://carwashservice:3000",
    "serviceType": services[0],
    "description": 'This is a ' + services[0],
    "position": {
        lat: 58.391620,
        long:15.549027
    },
    "active": isActive,
    "settings": ["queuetime", "distance"],
};

serviceArray.push(service)

for(let i = SERVICE_LOWERBOUND; i<SERVICE_UPPERBOUND; i++){
    if(i>99){
        isActive=0
    }else{
        isActive=1
    }

    service = {
        "serviceID": i,
        "serviceName": services[i%3] + i,
        "serviceURL": "https://" + "mockservice" + i,
        "serviceType": services[i%3],
        "description": 'This is a ' + services[i%3],
        "position": {
            lat: 58.391620,
            long:15.549027 + (i % 2)
        },
        "active": isActive,
        "settings": ["queuetime", "distance"],

    };
    serviceArray.push(service);
};

fs.writeFile('./app/db/mongo_data/initUser.json', JSON.stringify(usersArray), 'utf8', (err)=> {
    if(err) throw err;
    console.log('wrote to: initUser' )
});

fs.writeFile('./app/db/mongo_data/thirdpartyservices.json', JSON.stringify(serviceArray), 'utf8', (err) => {
    if(err) throw err;
    console.log('wrote to: thirdpartyservices')
});
