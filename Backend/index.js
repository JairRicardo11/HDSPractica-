const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.json());

let libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
  { id: 2, titulo: '1984', autor: 'George Orwell' }
];

// GET /libros - Lista todos los libros o filtra por autor
app.get('/libros', (req, res) => {
  const autor = req.query.autor;
  if (autor) {
    const filtrados = libros.filter(libro =>
      libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
    return res.json(filtrados);
  }
  res.json(libros);
});

// GET /libros/:id - Obtener libro por ID
app.get('/libros/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontrado');
  res.json(libro);
});

// POST /libros - Crear un nuevo libro
app.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) {
    return res.status(400).send('Faltan campos: título y autor son obligatorios');
  }

  const nuevoLibro = {
    id: libros.length ? libros[libros.length - 1].id + 1 : 1,
    titulo,
    autor
  };
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

// PUT /libros/:id - Actualizar libro
app.put('/libros/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).send('Libro no encontrado');

  const { titulo, autor } = req.body;
  if (titulo) libro.titulo = titulo;
  if (autor) libro.autor = autor;

  res.json(libro);
});

// DELETE /libros/:id - Eliminar libro
app.delete('/libros/:id', (req, res) => {
  const index = libros.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Libro no encontrado');

  const eliminado = libros.splice(index, 1);
  res.json(eliminado[0]);
});

// Inicia el servidor en puerto 3030
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
