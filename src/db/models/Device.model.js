const pool = require("../db");


const getDeviceById = (id) => {
    return pool.query("SELECT * FROM devices WHERE id =?", [id]);
}

const getDeviceByName = (name) => {
    return pool.query("SELECT * FROM devices WHERE name =?", [name]);
}

const getDevices = () => {
    return pool.query("SELECT * FROM devices");
}

const createDevice = (data) => {
    return pool.query("INSERT INTO devices SET ? ON DUPLICATE KEY UPDATE name=VALUES(name)", data);
}

const removeDeviceById = (id) => {
    return pool.query("DELETE FROM devices WHERE id = ?", [id]);
}


module.exports = {
    getDeviceById,
    getDeviceByName,
    getDevices,
    createDevice,
    removeDeviceById
}