const request = require('supertest');
const app = require('../../index');

describe('API de Tareas', () => {
  beforeEach(async () => {
    await request(app).post('/reset');
  });

  test('Debe crear una nueva tarea', async () => {
    const res = await request(app)
      .post('/tareas')
      .send({ titulo: 'Aprender Jest' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Aprender Jest');
    expect(res.body.completada).toBe(false);
  });

  test('Debe rechazar creación sin título', async () => {
    const res = await request(app).post('/tareas').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Debe listar tareas', async () => {
    await request(app).post('/tareas').send({ titulo: 'Una tarea' });

    const res = await request(app).get('/tareas');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test('Debe obtener una tarea por ID', async () => {
    const { body } = await request(app)
      .post('/tareas')
      .send({ titulo: 'Otra tarea' });

    const res = await request(app).get(`/tareas/${body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Otra tarea');
  });

  test('Debe actualizar una tarea', async () => {
    const { body } = await request(app)
      .post('/tareas')
      .send({ titulo: 'Actualizarme' });

    const res = await request(app)
      .put(`/tareas/${body.id}`)
      .send({ completada: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.completada).toBe(true);
  });

  test('Debe eliminar una tarea', async () => {
    const { body } = await request(app)
      .post('/tareas')
      .send({ titulo: 'Eliminarme' });

    const res = await request(app).delete(`/tareas/${body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.tarea.titulo).toBe('Eliminarme');
  });

  test('Debe devolver 404 si no se encuentra una tarea', async () => {
    const res = await request(app).get('/tareas/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('mensaje');
  });
});
