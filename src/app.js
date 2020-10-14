require('dotenv').config();

const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const deviceRouter = require('./domain/devices/device.router');
const deviceTypeRouter = require('./domain/deviceTypes/deviceType.router');
const commandRouter = require('./domain/commands/command.router');
const stateRouter = require('./domain/states/state.router');

const app = express();
app.use(logger('dev'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/devices", deviceRouter);
app.use("/api/types", deviceTypeRouter);
app.use("/api/commands", commandRouter);
app.use("/api/state", stateRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is up and running on the port: ${process.env.APP_PORT}`)
})