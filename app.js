const express = require('express');
const app = express();

app.use(express.json());

let tareas = [];
let id = 1;

app.post('/reset', (req, res) => {
  tareas = [];
  id = 1;
  res.status(204).end();
});

// Listar todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Obtener una tarea por ID
app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
  res.json(tarea);
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
  const tarea = {
    id: id++,
    titulo: req.body.titulo,
    completada: false,
  };
  tareas.push(tarea);
  res.status(201).json(tarea);
});

// Actualizar una tarea
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
  if (req.body.titulo !== undefined) {
    tarea.titulo = req.body.titulo;
  }
  if (req.body.completada !== undefined) {
    tarea.completada = req.body.completada;
  }
  res.json(tarea);
});

// Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  const index = tareas.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
  const [tareaEliminada] = tareas.splice(index, 1);
  res.json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada });
});

module.exports = app;
