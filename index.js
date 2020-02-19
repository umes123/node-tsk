const express = require('express');
const config = require('./config/config');
const db = require('./model/db.conn');
const bodyParser = require('body-parser');
const loginRoute = require("./routes/login");
const student = require("./routes/student");
const app = express();
const cors = require('cors');


app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(loginRoute);
app.use(student);


app.get('*', (req, res) => {
    res
        .status(404)
        .send("hello world")
})

app.listen(config.port, () => {
    console.log(`server running on ${config.port} port`);

})