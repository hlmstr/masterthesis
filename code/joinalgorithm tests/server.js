const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes.js');
const startused = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round((startused) * 100) / 100} MB`);


const startusedafter = process.memoryUsage().heapUsed / 1024 / 1024;
// const subscriptionsobject = require('../subscriptionService/db/mongo_data/userSubSeed.json')
const _ = require('lodash-joins')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

routes(app);

app.listen(port);

var useraccessor = function (obj) {
    return obj['userID'];
};

let time =[];
let memory =[];
const testruns = 10;

let usedAfter;
for (let index = 0; index < testruns; index++) {

    let left1 = require('../userService/db/mongo_data/initUser.json');
    let right1 = require('../positionService/db/mongo_data/userposseed.json')
    let right2 = require('../subscriptionService/db/mongo_data/userSubSeed.json')


    let starttime = new Date().valueOf()
    // var c = _.nestedLoopInnerJoin(left1,useraccessor,right1,useraccessor)
    // var d = _.nestedLoopInnerJoin(c,useraccessor,right2,useraccessor)

    // var c = _.hashInnerJoin(left1,useraccessor,right1,useraccessor)
    // var d = _.hashInnerJoin(c,useraccessor,right2,useraccessor)

    // var c = _.sortedMergeInnerJoin(left1,useraccessor,right1,useraccessor)
    // var d = _.sortedMergeInnerJoin(c,useraccessor,right2,useraccessor)
    let endtime = new Date().valueOf()
    usedAfter = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(usedAfter * 100) / 100} MB`);

    c=null
    d=null
    time.push(((endtime - starttime) / 1000))
    memory.push((((usedAfter) * 100)) / 100)

    console.log("memory", memory)
    console.log("time", time)

}
const memoryAvg = (memory.reduce((a,b) => a + b, 0) / memory.length)
const timeAvg = (time.reduce((a,b) => a + b, 0) / time.length)

console.log("timeAVG", timeAvg)
console.log("memoryAVG", memoryAvg)










console.log("DONE");