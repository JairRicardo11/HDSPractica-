let pingButton = document.querySelector('#pingButton');
let messageDiv = document.querySelector('#message');

pingButton.addEventListener('click', getPingFromWebService);

function getPingFromWebService() {
  const url = 'http://localhost:3030/ping';

  fetch(url)
    .then((response) => response.text()) // convertimos a texto
    .then((data) => {
      console.log("Respuesta del servidor Jair Yepez:", data);
      messageDiv.textContent = data; // mostramos en el div con id="message"
    })
    .catch((error) => {
      console.error("Error al conectar al servidor:", error);
      messageDiv.textContent = "Error al conectar con el servidor.";
    });
}
