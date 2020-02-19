const mongoose = require('mongoose');
const config = require('../config/config');

const options = {
    user: config.dbuser,
    pass: config.dbpwd,
    authSource: config.authsourse,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.connection;
mongoose.connect(config.dbUrl, options);


connection.on('error', (error) => console.log(error))

connection.once('open', () => console.log("Connected to DB successfuly"))
