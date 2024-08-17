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

	// TODO:  move some of this code into a separate file.
	// note:  not sure how to do that yet as this is the server.
	io.on('connection', (socket) => {
		console.log('**************************************************')
		console.log('>> server socket.id', socket.id)

		socket.on('join-room', (message, roomId, userName) => {
			console.log('>> join-room message: ', message)
			console.log('>> join-room roomId: ', roomId)
			console.log('>> join-room userName: ', userName)
			console.log('**************************************************')

			socket.join(roomId)
			io.to(roomId).emit('user-connected', message, roomId, userName)
		})

		socket.on('client-data', (message, roomId, userName) => {
			console.log('>> client-data: ', message, roomId, userName)
			console.log('**************************************************')
			io.to(roomId).emit('server-data', message, roomId, userName)
		})
	})

	httpServer
		.once('error', (err) => {
			console.error(err)
			process.exit(1)
		})
		.listen(port, () => {
			console.log(`*** Ready on http://${hostname}:${port} ***`)
		})
})
