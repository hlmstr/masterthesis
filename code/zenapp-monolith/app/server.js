const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes.js');

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log("Hello - Tracking the users for fun - monolith");