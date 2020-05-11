const mongoose = require('mongoose');
// setup connection
const mongoURL = 'mongodb://mongo:27017/database';
mongoose.connect(mongoURL, {useNewUrlParser: true});
// connect to db
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection errror:'))