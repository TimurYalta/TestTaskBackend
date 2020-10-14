const router = require("express").Router();
const {
    getDeviceByID,
    getDevices,
    createDevice,
    removeDevice,
} = require('./device.controller');
const {validate} = require('./device.validator');

router.get('/:id/', getDeviceByID);
router.get('/', getDevices);
router.post('/create/', validate('createDevice'), createDevice);
router.get('/remove/:id', removeDevice);

module.exports = router;