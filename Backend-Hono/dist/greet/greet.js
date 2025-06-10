import { Hono } from 'hono';
import { Greet } from './greet.mariadb.js';
const greet = new Hono();
// Obtener todos los saludos
greet.get('/regards', async (c) => {
    const result = await Greet.findAll();
    return c.json(result);
});
// Obtener saludo por ID
greet.get('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const result = await Greet.findById(id);
    return result
        ? c.json(result)
        : c.text(`No se encontró el id ${id}`, 404);
});
// Crear nuevo saludo
greet.post('/greet', async (c) => {
    const param = await c.req.json();
    const result = await Greet.create(param);
    return c.json(result, 201);
});
// Eliminar saludo por ID
greet.delete('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const deleted = await Greet.delete(id);
    return deleted
        ? c.text(`Registro con id ${id} eliminado`, 200)
        : c.text(`No se encontró el id ${id}`, 404);
});
// Actualizar saludo por ID
greet.put('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const param = await c.req.json();
    const updated = await Greet.update(id, param);
    return updated
        ? c.text(`Registro con id ${id} actualizado`, 200)
        : c.text(`No se encontró el id ${id}`, 404);
});
export default greet;
