const {ResponseError, ResponseSuccess} = require('../../utils/response');
const StateModel = require('../../db/models/State.model');

const getDeviceState = async (req, res) => {
    const {id} = req.params;
    try {
        const state = await StateModel.getDeviceState(id);
        if (!state || state.length === 0) {
            return ResponseError(res,
                {message: "Error while getting device state"}, 404);
        }
        return ResponseSuccess(res, state[0], 200);
    } catch (error) {
        console.log(error);
        return ResponseError(res,
            {message: "Error while getting device state", error: JSON.stringify(error)},
            500);
    }
}

module.exports = {
    getDeviceState
};