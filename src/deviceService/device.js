const moment = require('moment');

const sendCommandToDevice = (id, command) => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const status = {
        id,
        online: true,
        last_error: "",
        status: "active",
        last_sync_date: now
    };
    const fakeRequest = new Promise((resolve) => {
        let wait = setTimeout(() => {
            clearTimeout(wait);
            resolve(status);
        }, 200)
    })
    return fakeRequest;
};

module.exports = {
    sendCommandToDevice
};