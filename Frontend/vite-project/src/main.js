import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Simulador de Web Service</h1>

  <div class="card">
    <p><strong>Estado del servicio:</strong></p>
    <div id="message">Esperando ping...</div>
  </div>

  <button id="pingButton">Enviar Ping</button>
`;

function getPingFromWebService() {
  const url = 'http://localhost:3030/ping';
  const message = document.getElementById('message');

  message.textContent = 'Consultando al Web Service...';
  message.style.color = '#999';

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then((data) => {
      message.textContent = `Respuesta: ${data.message || '¡Web Service activo!'}`;
      message.style.color = '#28a745';
    })
    .catch((error) => {
      console.error('Error al conectar con el Web Service:', error);
      message.textContent = 'No se pudo conectar con el Web Service.';
      message.style.color = '#dc3545';
    });
}

document.getElementById('pingButton').addEventListener('click', getPingFromWebService);
