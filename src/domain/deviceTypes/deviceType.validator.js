const {body,} = require('express-validator');
const {missingFieldMessage} = require('../../utils/strings');

const validate = (method) => {
    switch (method) {
        case 'createType':
            return [
                body('type', missingFieldMessage("Type")).exists(),
                body('name', missingFieldMessage("Device name")).exists()
            ]
        default:
            return []
    }
}

module.exports = {
    validate
};

