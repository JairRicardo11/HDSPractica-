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
  console.log('POST recibido:', req.body); // Muestra en consola del servidor
  res.json({ message: 'Pong desde el servidor - Yepez Jair' });
});

// Ruta principal GET con HTML visual + formulario POST
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
          width: 400px;
        }
        h1 {
          margin-bottom: 10px;
        }
        p {
          font-size: 18px;
          color: #367fa9;
        }
        form {
          margin-top: 20px;
        }
        input, button {
          padding: 10px;
          margin-top: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          width: 100%;
        }
        button {
          background-color: #3c8dbc;
          color: white;
          border: none;
          cursor: pointer;
        }
        #respuesta {
          margin-top: 20px;
          color: green;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>¡Hola Mundo!</h1>
        <p>Servidor corriendo con Node.js y Express</p>
        <p><strong>Desarrollado por: Yepez Jair</strong></p>

        <form id="formulario">
          <input type="text" id="mensaje" placeholder="Escribe un mensaje..." required />
          <button type="submit">Enviar POST a /ping</button>
        </form>
        <div id="respuesta"></div>
      </div>

      <script>
        const formulario = document.getElementById('formulario');
        const respuesta = document.getElementById('respuesta');

        formulario.addEventListener('submit', function(e) {
          e.preventDefault();

          const mensaje = document.getElementById('mensaje').value;

          fetch('/ping', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje })
          })
          .then(res => res.json())
          .then(data => {
            console.log('Respuesta del servidor:', data);
            respuesta.innerText = data.message;
          })
          .catch(error => {
            console.error('Error:', error);
            respuesta.innerText = 'Hubo un error al enviar el POST.';
          });
        });
      </script>
    </body>
    </html>
  `;
  res.send(html);
});

// Ruta principal POST (puedes dejarla así o quitarla si no se usa)
app.post('/', (req, res) => {
  res.send('¡Hola Mundo con Node.js y Express (POST)!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
