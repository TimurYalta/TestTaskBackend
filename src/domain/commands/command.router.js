const router = require("express").Router();
const {
    getDeviceCommandHistory,
    sendCommand
} = require('./command.controller');


router.get('/:id', getDeviceCommandHistory);
router.post('/send/:id', sendCommand);


module.exports = router;