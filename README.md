# 📘 API REST - Sistema de Gestión de Prácticas

Este proyecto implementa una API RESTful utilizando **Node.js** y **Express**, diseñada para gestionar registros de libros, específicamente comenzando con el título **"Sistema de gestión de prácticas"** del autor **Yepez Montenegro Jair Ricardo**.  
Permite realizar operaciones **CRUD**: crear, consultar, actualizar y eliminar, además de **filtrar por autor**.

---

## 🌐 URL base de la API

```
http://3.145.217.96:3030
```

---

## 🔁 Endpoints disponibles

| Método | Ruta                           | Función                               |
|--------|--------------------------------|----------------------------------------|
| GET    | `/libros`                      | Recupera todos los libros              |
| GET    | `/libros?autor=<nombre>`       | Busca libros por autor                 |
| GET    | `/libros/:id`                  | Muestra un libro específico            |
| POST   | `/libros`                      | Registra un nuevo libro                |
| PUT    | `/libros/:id`                  | Modifica un libro existente            |
| DELETE | `/libros/:id`                  | Elimina un libro por ID                |

---

## 🧪 Detalle de Endpoints

### 🔍 `GET /libros`

Devuelve una lista de todos los libros registrados.

**Filtrado por autor (opcional):**
```
GET /libros?autor=narvaez
```

**Respuesta esperada:**
```json
[
  { "id": 1, "titulo": "Sistema de gestión de prácticas", "autor": "Yepez Montenegro Jair Ricardo" }
]
```

---

### 🔎 `GET /libros/:id`

Consulta un libro específico mediante su ID.

**Ejemplo:**
```
GET /libros/1
```

**Respuesta:**
```json
{ "id": 1, "titulo": "Sistema de gestión de prácticas", "autor": "Yepez Montenegro Jair Ricardo" }
```

**Error si no existe:**
```json
{ "mensaje": "No encontramos ningún libro con ese ID." }
```

---

### ➕ `POST /libros`

Agrega un nuevo libro. Se deben proporcionar `titulo` y `autor`.

**Cuerpo del request:**
```json
{ "titulo": "Nuevo Libro", "autor": "Nuevo Autor" }
```

**Respuesta:**
```json
{ "id": 2, "titulo": "Nuevo Libro", "autor": "Nuevo Autor" }
```

---

### 🛠 `PUT /libros/:id`

Actualiza los datos de un libro existente.

**Cuerpo del request:**
```json
{ "titulo": "Sistema actualizado", "autor": "Yepez Montenegro Jair Ricardo" }
```

**Respuesta:**
```json
{ "id": 1, "titulo": "Sistema actualizado", "autor": "Yepez Montenegro Jair Ricardo" }
```

---

### ❌ `DELETE /libros/:id`

Elimina un libro según su identificador.

**Ejemplo:**
```
DELETE /libros/1
```

**Respuesta:**
```json
{
  "mensaje": "El libro ha sido eliminado exitosamente.",
  "libro": {
    "id": 1,
    "titulo": "Sistema de gestión de prácticas",
    "autor": "Yepez Montenegro Jair Ricardo"
  }
}
```

---

## 🐳 Instalación de Docker (Ubuntu)

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
```

---

## 🛠 Dockerfile del Proyecto

```Dockerfile
FROM node:20.10.0-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm i
COPY index.js .
EXPOSE 3000
CMD ["node", "index.js"]
```

---

## 🚀 Instrucciones para Docker

```bash
# Construir imagen
sudo docker build -t sistema-practicas .

# Ejecutar contenedor
sudo docker run -d -p 3000:3000 --name practicas --restart on-failure sistema-practicas:latest
```

**Parámetros importantes:**
- `-t sistema-practicas`: nombre de la imagen.
- `--name practicas`: nombre del contenedor.
- `--restart on-failure`: reinicia el contenedor si ocurre un fallo.

---

## 🧪 PRÁCTICA 1 – Herramientas de Desarrollo de Software

### 📦 npm – Gestor de Paquetes

- Utiliza `npm` para manejar dependencias en proyectos Node.js.
- Comando inicial:
  ```bash
  npm init
  ```

### 📁 Archivo Principal

1. Crear archivo `index.js`.
2. Colocar el código principal de la API.
3. Ejecutar:
   ```bash
   node index.js
   ```

### ⚙️ Express.js

- Instalar:
  ```bash
  npm i express
  ```
- Express permite manejar rutas y levantar el servidor HTTP con facilidad.

---

## 🎨 Frontend con Vite (opcional)

Para generar un frontend liviano:

```bash
npm create vite@latest
```

- Ingresar nombre del proyecto
- Seleccionar framework (ej. Vanilla)
- Elegir variante (ej. JavaScript)

Luego:

```bash
cd nombre-proyecto
npm install
npm run dev
```

---

**Autor del proyecto:**  
📘 *Yepez Montenegro Jair Ricardo*  
📅 *2025 - Desarrollo de API RESTful para gestión de prácticas*