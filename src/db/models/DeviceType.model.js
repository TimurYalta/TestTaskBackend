const pool = require("../db");


const getTypeByName = (name) => {
    return pool.query("SELECT * FROM device_types WHERE name =?", [name]);
}

const getTypes = () => {
    return pool.query("SELECT * FROM device_types");
}

const createType = (data) => {
    return pool.query("INSERT INTO device_types SET ? ON DUPLICATE KEY UPDATE name=VALUES(name)", data);
}

const removeType = (name) => {
    return pool.query("DELETE FROM devices WHERE name = ?", [name]);
}


module.exports = {
    getTypeByName,
    getTypes,
    createType,
    removeType,
}