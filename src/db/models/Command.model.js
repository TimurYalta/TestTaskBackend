const pool = require("../db");


const getHistory = (id) => {
    return pool.query("SELECT * FROM history WHERE id =? ORDER BY date DESC", [id]);
};

const addCommandToHistory = (data) => {
    return pool.query("INSERT INTO history SET ?", data);
}

const clearHistory = (id) => {
    return pool.query("DELETE FROM history where id=?", [id]);
}

module.exports = {
    getHistory,
    clearHistory,
    addCommandToHistory
};
