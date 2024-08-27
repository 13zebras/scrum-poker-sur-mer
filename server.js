const { createServer } = require('node:http')
const next = require('next')
const { Server } = require('socket.io')

// require for the socketOn function.
const socketOnHandler = require('./src/services/socketOn')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
	const httpServer = createServer(handler)

	const io = new Server(httpServer, {
		cors: {
			origin: 'http://localhost:3000',
		},
	})

	io.on('connection', (socket) => {
		console.log('**************************************************')
		console.log('>> server socket.id', socket.id)
		console.log('**************************************************\n')
		socketOnHandler(io, socket)
	})

	httpServer
		.once('error', (err) => {
			console.error(err)
			process.exit(1)
		})
		.listen(port, () => {
			console.log(`*** Ready on http://${hostname}:${port} ***\n\n`)
		})
})
