const {body,} = require('express-validator');
const {missingFieldMessage} = require('../../utils/strings');

const validate = (method) => {
    switch (method) {
        case 'createDevice':
            return [
                body('type', missingFieldMessage("Type")).exists(),
                body('name', missingFieldMessage("Device name")).exists(),
                body('ip', missingFieldMessage("IP")).exists(),
                body('port', missingFieldMessage("Port")).exists(),
            ];
        default:
            return []
    }
}


module.exports = {
    validate
};

