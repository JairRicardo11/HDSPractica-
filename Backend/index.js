const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json()); // Permite recibir JSON en POST

// Ruta de prueba GET
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong desde el servidor - Yepez Jair' });
});

// Ruta de prueba POST
app.post('/ping', (req, res) => {
  res.json({ message: 'Pong desde el servidor - Yepez Jair' });
});

// Ruta principal GET con diseño visual en HTML
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Servidor Node.js</title>
      <style>
        body {
          background: #f0f4f8;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
          color: #0d2d62;
        }
        h1 {
          margin-bottom: 10px;
        }
        p {
          font-size: 18px;
          color: #367fa9;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>¡Hola Mundo!</h1>
        <p>Servidor corriendo con Node.js y Express</p>
        <p><strong>Desarrollado por: Yepez Jair</strong></p>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Ruta principal POST
app.post('/', (req, res) => {
  res.send('¡Hola Mundo con Node.js y Express (POST)!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
