const DeviceModel = require('../../db/models/Device.model');
const StateModel = require('../../db/models/State.model');
const CommandModel = require('../../db/models/Command.model');
const {validationResult} = require('express-validator');
const uuid = require('uuid');
const moment = require("moment");
const {ResponseError, ResponseSuccess} = require('../../utils/response');


const getDeviceByID = async (req, res) => {
    const {id} = req.params;
    try {
        const device = await DeviceModel.getDeviceById(id);
        if (device && device.length == 0) {
            return ResponseError(res, {message: "Device with such id not found"}, 404);
        } else {
            return ResponseSuccess(res, device[0], 200);
        }
    } catch (error) {
        console.log(error);
        return ResponseError(res, {message: "Error while getting device by id", error}, 404);
    }
}

async function getDevices(req, res) {
    try {
        const devices = await DeviceModel.getDevices();
        return ResponseSuccess(res, devices, 200);
    } catch (error) {
        console.log(error);
        return ResponseError(res, {message: "Error while getting devices", error}, 500);
    }
}

async function createDevice(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ResponseError(res, {message: "Validation unsuccessful", error: errors.array()}, 422);
    }
    try {
        const body = {...req.body};
        const id = uuid();
        const isDeviceUnique = await DeviceModel.getDeviceByName(body.name);
        if (isDeviceUnique && isDeviceUnique.length != 0) {
            return ResponseError(res, {message: "Device with such name exists"}, 400);
        }
        body.id = uuid();
        const creationResults = await DeviceModel.createDevice(body);
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const status = {
            id: body.id,
            online: true,
            last_error: "",
            status: "active",
            last_sync_date: now
        };
        const stateCreationResults = await StateModel.setDeviceState(status);
        return ResponseSuccess(res, {message: "Device entry successfully created"}, 200);
    } catch (error) {
        console.log(error)
        return ResponseError(res, {message: "Error while creating device", error: JSON.stringify(error)}, 500);
    }
}

async function removeDevice(req, res) {
    const {id} = req.params;
    try {
        const removed = await DeviceModel.removeDeviceById(id);
        await StateModel.clearState(id);
        await CommandModel.clearHistory(id);
        return ResponseSuccess(res, removed, 200);
    } catch (error) {
        console.log(error);
        return ResponseError(res, {message: "Error while removing device " + id, error}, 500);
    }
}


module.exports = {
    getDeviceByID,
    getDevices,
    createDevice,
    removeDevice,
};