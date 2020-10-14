const pool = require("../db");


const getDeviceState = (id) => {
    return pool.query("SELECT * FROM status WHERE id =?", [id]);
};

const setDeviceState = (data) => {
    return pool.query("INSERT INTO status SET ? ON DUPLICATE KEY UPDATE id=VALUES(id)," +
        " online=VALUES(online), status=VALUES(STATUS), last_error=VALUES(last_error)," +
        " last_sync_date = VALUES(last_sync_date)", data);
};

const clearState = (id) => {
    return pool.query("DELETE FROM status WHERE id=?", [id])
}


module.exports = {
    getDeviceState,
    clearState,
    setDeviceState
};
