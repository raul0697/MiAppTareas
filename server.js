const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    db.all("SELECT * FROM tareas", [], (err, rows) => {
        res.json(rows);
    });
});

// Insertar tarea
app.post('/api/tareas', (req, res) => {
    const { descripcion } = req.body;
    db.run("INSERT INTO tareas (descripcion) VALUES (?)", [descripcion], function (err) {
        res.json({ id: this.lastID, descripcion });
    });
});

// Modificar tarea
app.put('/api/tareas/:id', (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    db.run("UPDATE tareas SET descripcion = ? WHERE id = ?", [descripcion, id], () => {
        res.json({ id, descripcion });
    });
});

// Eliminar tarea
app.delete('/api/tareas/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM tareas WHERE id = ?", [id], () => {
        res.json({ id });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
