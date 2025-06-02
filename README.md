# API REST de Libros en Node.js con Express

Este proyecto es un servicio web RESTful desarrollado con **Node.js** y **Express** para gestionar una colección de libros. Permite **crear**, **leer**, **actualizar** y **eliminar** libros, además de **filtrar libros por autor**.

---

## URL base de la API

La API está desplegada y accesible desde:

```
http://3.133.95.14:3000
```

---

## Endpoints disponibles

| Método | Endpoint                        | Descripción                         |
|--------|----------------------------------|-------------------------------------|
| GET    | `/libros`                        | Obtener todos los libros            |
| GET    | `/libros?autor=<nombre>`         | Filtrar libros por autor            |
| GET    | `/libros/:id`                    | Obtener un libro por su ID          |
| POST   | `/libros`                        | Crear un nuevo libro                |
| PUT    | `/libros/:id`                    | Actualizar un libro por su ID       |
| DELETE | `/libros/:id`                    | Eliminar un libro por su ID         |

---

## Explicación detallada de los endpoints

### `GET /libros`

Devuelve una lista de todos los libros.

- Sin parámetros: lista completa.
- Con `?autor=nombre`: filtra por autor (no distingue mayúsculas o minúsculas).

**Ejemplo sin filtro:**  
```
GET http://3.133.95.14:3000/libros
```

**Respuesta:**
```json
[
  { "id": 1, "titulo": "Cien Años de Soledad", "autor": "Gabriel García Márquez" },
  { "id": 2, "titulo": "Don Quijote de la Mancha", "autor": "Miguel de Cervantes" }
]
```

**Ejemplo con filtro:**  
```
GET http://3.133.95.14:3000/libros?autor=Gabriel
```

**Respuesta (si hay coincidencias):**
```json
[
  { "id": 1, "titulo": "Cien Años de Soledad", "autor": "Gabriel García Márquez" }
]
```

**Respuesta (si no hay coincidencias):**
```json
{ "mensaje": "No se encontraron libros del autor \"Gabriel\"" }
```

---

### `GET /libros/:id`

Obtiene un libro por su ID.

**Ejemplo:**
```
GET http://3.133.95.14:3000/libros/1
```

**Respuesta:**
```json
{ "id": 1, "titulo": "Cien Años de Soledad", "autor": "Gabriel García Márquez" }
```

**Si no existe:**
```json
{ "mensaje": "Libro no encontrado" }
```

---

### `POST /libros`

Crea un nuevo libro. Se debe enviar un objeto JSON con `titulo` y `autor`.

**Ejemplo:**
```json
{ "titulo": "Rayuela", "autor": "Julio Cortázar" }
```

**Respuesta:**
```json
{ "id": 3, "titulo": "Rayuela", "autor": "Julio Cortázar" }
```

**Validación:** Si falta título o autor, devuelve 400.

---

### `PUT /libros/:id`

Actualiza un libro existente.

**Ejemplo:**
```json
{ "titulo": "Rayuela (Edición Revisada)", "autor": "Julio Cortázar" }
```

**Respuesta:**
```json
{ "id": 3, "titulo": "Rayuela (Edición Revisada)", "autor": "Julio Cortázar" }
```

**Errores posibles:**  
- Si no existe el libro: 404.  
- Si faltan campos: 400.

---

### `DELETE /libros/:id`

Elimina un libro por ID.

**Ejemplo:**
```
DELETE http://3.133.95.14:3000/libros/3
```

**Respuesta:**
```json
{
  "mensaje": "Libro eliminado correctamente",
  "libro": {
    "id": 3,
    "titulo": "Rayuela (Edición Revisada)",
    "autor": "Julio Cortázar"
  }
}
```

**Si no existe:**
```json
{ "mensaje": "No se puede eliminar: libro no encontrado" }
```

---

## Instalación de Docker en Ubuntu

```bash
# 1. Actualizar el índice de paquetes
sudo apt update

# 2. Instalar dependencias necesarias
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# 3. Agregar la clave GPG oficial de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 4. Añadir el repositorio de Docker
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

# 5. Verificar la versión de Docker disponible
apt-cache policy docker-ce

# 6. Instalar Docker
sudo apt install docker-ce

# 7. Verificar que Docker esté funcionando
sudo systemctl status docker
```

### ¿Qué hace cada comando?
- `apt update`: actualiza la lista de paquetes.
- `apt install ...`: instala dependencias necesarias para usar HTTPS y manejar repositorios.
- `curl -fsSL ... | apt-key add -`: descarga y agrega la clave de confianza de Docker.
- `add-apt-repository`: registra el repositorio oficial de Docker.
- `apt-cache policy`: muestra qué versiones están disponibles.
- `systemctl status docker`: verifica si Docker está activo.

---

## Dockerfile 

```dockerfile
FROM node:20.10.0-alpine3.18     # Imagen base ligera con Node.js
WORKDIR /app                    # Directorio de trabajo en el contenedor
COPY package.json .            # Copia las dependencias
RUN npm i                      # Instala las dependencias
COPY index.js .                # Copia el archivo principal
EXPOSE 3000                    # Expone el puerto 3000 para la API
CMD ["node", "index.js"]       # Comando que inicia la app
```

---

## Crear imagen y contenedor con Docker

```bash
# 1. Construir imagen
sudo docker build -t node-hello .

# 2. Ejecutar contenedor
sudo docker run -d -p 3000:3000 --name hello --restart on-failure node-hello:latest
```

### Explicación de parámetros
- `-t node-hello`: etiqueta la imagen con ese nombre.
- `-d`: ejecuta en segundo plano.
- `-p 3000:3000`: enlaza el puerto local al del contenedor.
- `--name hello`: nombre del contenedor.
- `--restart on-failure`: reinicia automáticamente si falla.

---










# PRÁCTICA 1 – HERRAMIENTAS DE DESARROLLO DE SOFTWARE

# npm – Gestor de paquetes de Node.js

    - npm es el sistema de gestión de paquetes de Node.js. 
    
    - Permite instalar, compartir y administrar dependencias de proyectos JavaScript.

    - El comando npm init crea un nuevo proyecto de Node.js. Al ejecutarlo, solicita información como el nombre del proyecto, versión, descripción, punto de entrada, etc.

Creación del archivo principal

    - Crear un archivo llamado index.js.

    - Escribir en ese archivo el código que se desea ejecutar.

    - Para ejecutar el proyecto, usar el comando node index.js.

# Express.js

    El comando npm i express instala el framework Express. Express permite crear servidores y gestionar rutas de manera sencilla en aplicaciones Node.js.

# Frontend – Proyecto con Vite

Para crear un nuevo proyecto con Vite, usar el comando npm create vite@latest.

El sistema pedirá los siguientes datos:

    - Nombre del proyecto (Project name)

    - Seleccionar un framework (por ejemplo, Vanilla)

    - Seleccionar una variante (por ejemplo, JavaScript)

Una vez finalizada la configuración:

    - Acceder al directorio del proyecto con cd vite-project

    - Instalar las dependencias con npm install

    - Ejecutar el servidor de desarrollo con  npm run dev
