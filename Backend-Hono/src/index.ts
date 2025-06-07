import { serve } from '@hono/node-server'
import { Hono } from 'hono'

// Importar routers desde los módulos
import ping from '../src/ping/ping.js'
import greet from '../src/greet/greet.js'

// Crear instancia del servidor Hono
const server = new Hono()

// Ruta principal
server.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Montar routers (suponiendo que manejan sus propias subrutas como /ping y /greet)
server.route('/', ping)
server.route('/', greet)

const port = 3030
console.log(`Server is running on port ${port}`)

serve({
  fetch: server.fetch,
  port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
