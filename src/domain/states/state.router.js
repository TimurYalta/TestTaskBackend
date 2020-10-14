const router = require("express").Router();
const {
    getDeviceState
} = require('./state.controller');

router.get('/:id', getDeviceState);

module.exports = router;