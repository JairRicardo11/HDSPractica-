// Importar Express
const express = require('express');
const server = express();

// Puerto donde se ejecutará el servidor
const PORT = 3030;

// Middleware para poder leer datos en formato JSON
server.use(express.json());

// Array de Libros
let libros = [
    { id: 1, titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón' },
    { id: 2, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss' },
    { id: 3, titulo: 'Los hombres me explican cosas', autor: 'Rebecca Solnit' },
    { id: 4, titulo: 'La tregua', autor: 'Mario Benedetti' },
    { id: 5, titulo: 'El arte de la guerra', autor: 'Sun Tzu' },
    { id: 6, titulo: 'Rayuela', autor: 'Julio Cortázar' },
    { id: 7, titulo: 'El código Da Vinci', autor: 'Dan Brown' },
    { id: 8, titulo: 'Sapiens: De animales a dioses', autor: 'Yuval Noah Harari' },
    { id: 9, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury' },
    { id: 10, titulo: 'Crónica de una muerte anunciada', autor: 'Gabriel García Márquez' }
];

// Ruta principal (mensaje de bienvenida)
server.get('/', (req, res) => {
    res.send('Bienvenido a la API de gestión de libros 📚');
});

// Crear un nuevo libro
server.post('/libros', (req, res) => {
    const { titulo, autor } = req.body;

    // Validación de campos obligatorios
    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: 'Faltan datos: se requiere tanto el título como el autor.' });
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
    const { autor } = req.query;

    if (autor) {
        const librosFiltrados = libros.filter(libro =>
            libro.autor.toLowerCase().includes(autor.toLowerCase())
        );

        // Si no se encuentra ningún libro que coincida
        if (librosFiltrados.length === 0) {
            return res.status(404).json({ mensaje: `No hay coincidencias con el autor "${autor}".` });
        }

        return res.json(librosFiltrados);
    }

    // Si no se pasó el filtro, devolver todos
    res.json(libros);
});

// Obtener un libro por su ID
server.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    // Si no se encuentra el libro, responder con error 404
    if (!libro) {
        return res.status(404).json({ mensaje: 'No encontramos ningún libro con ese ID.' });
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
        return res.status(404).json({ mensaje: 'Actualización fallida: libro no localizado.' });
    }

    // Validación de campos obligatorios
    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: 'Para actualizar, proporciona el título y el autor correctamente.' });
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
        return res.status(404).json({ mensaje: 'No fue posible eliminar el libro: ID no encontrado.' });
    }

    // Eliminar el libro del array
    const libroEliminado = libros.splice(index, 1);
    res.json({ mensaje: 'El libro ha sido eliminado exitosamente.', libro: libroEliminado[0] });
});

// Iniciar el servidor y escuchar en el puerto especificado
server.listen(PORT, () => {
    console.log(`Servidor iniciado correctamente en http://localhost:${PORT}`);
});
