// Importar Express
const express = require('express');
const server = express();

// Puerto donde se ejecutará el servidor
const PORT = 3000;

// Middleware para poder leer datos en formato JSON
server.use(express.json());

// Array de Libros
let libros = [
    { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' }
];

// Ruta principal (mensaje de bienvenida)
server.get('/', (req, res) => {
    res.send('API REST de libros en Node.js con Express');
});

// Crear un nuevo libro
server.post('/libros', (req, res) => {
    const { titulo, autor } = req.body;

    // Validación de campos obligatorios
    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: 'El título y el autor son obligatorios' });
    }

    // Crear nuevo objeto libro con ID incremental
    const nuevoLibro = {
        id: libros.length ? libros[libros.length - 1].id + 1 : 1,
        titulo,
        autor
    };

    libros.push(nuevoLibro); // Guardar el nuevo libro en el array
    res.status(201).json(nuevoLibro); // Respuesta con el libro creado
});

// Obtener todos los libros
server.get('/libros', (req, res) => {
    res.json(libros);
});

// Obtener un libro por su ID
server.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    // Si no se encuentra el libro, responder con error 404
    if (!libro) {
        return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    res.json(libro);
});

// Actualizar un libro existente
server.put('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor } = req.body;

    const index = libros.findIndex(l => l.id === id);

    // Si no se encuentra el libro, responder con error 404
    if (index === -1) {
        return res.status(404).json({ mensaje: 'No se puede actualizar: libro no encontrado' });
    }

    // Validación de campos obligatorios
    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: 'El título y el autor son obligatorios para actualizar' });
    }

    // Actualizar los datos del libro
    libros[index] = { id, titulo, autor };
    res.json(libros[index]);
});

// Eliminar un libro por su ID
server.delete('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = libros.findIndex(l => l.id === id);

    // Si no se encuentra el libro, responder con error 404
    if (index === -1) {
        return res.status(404).json({ mensaje: 'No se puede eliminar: libro no encontrado' });
    }

    // Eliminar el libro del array
    const libroEliminado = libros.splice(index, 1);
    res.json({ mensaje: 'Libro eliminado correctamente', libro: libroEliminado[0] });
});

// Iniciar el servidor y escuchar en el puerto especificado
server.listen(PORT, () => {
    console.log(`Servidor iniciado correctamente en http://localhost:${PORT}`);
});
