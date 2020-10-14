const {ResponseError, ResponseSuccess} = require('../../utils/response');
const CommandModel = require('../../db/models/Command.model');
const StateModel = require('../../db/models/State.model');
const {sendCommandToDevice} = require('../../deviceService/device')

const getDeviceCommandHistory = async (req, res) => {
    const {id} = req.params;
    try {
        const history = await CommandModel.getHistory(id);
        return ResponseSuccess(res, history, 200);
    } catch (error) {
        console.log(error);
        return ResponseError(res,
            {message: "Error while getting device history", error: JSON.stringify(error)},
            404);
    }
}

const sendCommand = async (req, res) => {
    const body = {...req.body};
    const id = req.params.id;
    try {
        const status = await sendCommandToDevice(id, body.command);
        const dbReq = await CommandModel.addCommandToHistory({
            id,
            command: body.command,
            date: status.last_sync_date
        });
        const statusDBReq = await StateModel.setDeviceState(status);
        return ResponseSuccess(res, status, 200);
    } catch (error) {
        console.log(error);
        return ResponseError(res,
            {message: "Error while sending command to device", error: JSON.stringify(error)},
            404);
    }
};


module.exports = {
    getDeviceCommandHistory,
    sendCommand
};