const router = require("express").Router();
const {
    getTypes,
    getType,
    createType,
    removeType
} = require('./deviceType.controller');
const {validate} = require('./deviceType.validator');

router.get('/:name/', getType);
router.get('/', getTypes);
router.post('/create/', validate('createType'), createType);
router.get('/remove/:name', removeType);

module.exports = router;