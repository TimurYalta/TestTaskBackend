const DeviceTypeModel = require('../../db/models/DeviceType.model');
const {validationResult} = require('express-validator');
const {ResponseError, ResponseSuccess} = require('../../utils/response');

const getType = async (req, res) => {
    const {name} = req.params;
    try {
        const type = await DeviceTypeModel.getTypeByName(name);
        if (type && type.length == 0) {
            return ResponseError(res, {message: "Type with such alias not found"}, 404);
        } else {
            return ResponseSuccess(res, type[0], 200);
        }
    } catch (error) {
        console.log(error);
        return ResponseError(res,
            {message: "Error while getting type", error: JSON.stringify(error)},
            404);
    }
}

async function getTypes(req, res) {
    try {
        const types = await DeviceTypeModel.getTypes();
        return ResponseSuccess(res, types, 200);
    } catch (error) {
        console.log(error);
        return ResponseError(res, {message: "Error while getting types", error: JSON.stringify(error)}, 500);
    }
}

async function createType(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ResponseError(res, {message: "Validation unsuccessful", error: errors.array()}, 422);
    }
    try {
        const body = {...req.body};
        const isTypeUnique = await DeviceTypeModel.getTypeByName(body.name);
        if (isTypeUnique && isTypeUnique.length != 0) {
            return ResponseError(res, {message: "Type with such alias exists"}, 400);
        }
        await DeviceTypeModel.createType(body);
        return ResponseSuccess(res, {message: "Device type entry successfully created"}, 200);
    } catch (error) {
        console.log(error)
        return ResponseError(res, {message: "Error while creating device type", error: JSON.stringify(error)}, 500);
    }
}

async function removeType(req, res) {
    const {name} = req.params;
    try {
        const removed = await DeviceTypeModel.removeType(name);
        return ResponseSuccess(res, removed, 200);
    } catch (error) {
        console.log(error);
        return ResponseError(res, {message: "Error while removing type " + name, error: JSON.stringify(error)}, 500);
    }
}


module.exports = {
    getTypes,
    getType,
    createType,
    removeType,
};