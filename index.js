const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let tareas = [];
let id = 1;

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
  const nuevaTarea = {
    id: id++,
    titulo: req.body.titulo,
    completada: false,
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Actualizar una tarea existente
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

  tarea.titulo = req.body.titulo ?? tarea.titulo;
  tarea.completada = req.body.completada ?? tarea.completada;

  res.json(tarea);
});

// Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  const index = tareas.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });

  const eliminada = tareas.splice(index, 1);
  res.json({ mensaje: 'Tarea eliminada', tarea: eliminada[0] });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
