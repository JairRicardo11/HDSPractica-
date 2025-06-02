const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Habilita CORS para todas las rutas y orígenes
app.use(cors());
app.use(express.json()); // Permite recibir JSON en POST

// Ruta de prueba
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong desde el servidor - USUAY ESTEVAN' });
});

// Ruta de prueba (POST)
app.post('/ping', (req, res) => {
  res.json({ message: 'Pong desde el servidor - USUAY ESTEVAN' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Ruta principal (mejorada visualmente)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Instancia Ubuntu AWS</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, #141E30, #243B55);
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(5px);
          }
          h1 {
            font-size: 3em;
            margin-bottom: 0.2em;
            color: #00d8ff;
          }
          p {
            font-size: 1.2em;
            color: #d1d1d1;
          }
          .tag {
            margin-top: 1em;
            font-size: 0.9em;
            color: #aaa;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>¡Hola Mundo!</h1>
          <p>Servidor corriendo en una instancia de <strong>AWS EC2 Ubuntu</strong>.</p>
          <p>Desarrollado con Express y desplegado exitosamente <3</p>
          <div class="tag">USUAY MORILLO ESTEVAN ALEJANDRO</div>
        </div>
      </body>
    </html>
  `);
});


// Ruta principal (POST)
// Ruta principal (POST)
app.post('/', (req, res) => {
  const datos = req.body;

  res.send(`
    <html>
      <head>
        <title>Respuesta POST</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          }
          h1 {
            font-size: 2.5em;
            color: #ffffff;
          }
          p {
            font-size: 1.1em;
            color: #e0e0e0;
          }
          .json {
            margin-top: 20px;
            padding: 10px;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            font-family: monospace;
            color: #ffeecc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>¡POST recibido exitosamente!</h1>
          <p>Servidor en AWS EC2 con Ubuntu</p>
          <div class="json">
            <strong>Datos recibidos:</strong><br>
            ${JSON.stringify(datos, null, 2)}
          </div>
        </div>
      </body>
    </html>
  `);
});


