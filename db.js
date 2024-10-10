const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE tareas (id INTEGER PRIMARY KEY, descripcion TEXT)");
});

module.exports = db;
