const { createServer } = require('node:http')
const next = require('next')
const { Server } = require('socket.io')

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
		console.log('>>> server socket.id', socket.id)

		socket.on('join-room', (roomId, userName) => {
			console.log('>>> join-room roomId: ', roomId)
			console.log('>>> join-room userName: ', userName)
			socket.join(roomId)
			io.to(roomId).emit('user-connected', roomId, userName)
		})

		socket.on('client-message', (message, roomId) => {
			console.log('>>> client-message: ', message, roomId)
			io.to(roomId).emit('chat', message, roomId)
		})
	})

	httpServer
		.once('error', (err) => {
			console.error(err)
			process.exit(1)
		})
		.listen(port, () => {
			console.log(`>>>Ready on http://${hostname}:${port}`)
		})
})
