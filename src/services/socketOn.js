// This file is used to handle the socket.on event

module.exports = (io, socket) => {
	socket.onAny((eventName, ...args) => {
		console.log('>> eventName:', eventName)
		console.log('>> args:', args)
		const [message, roomId, userName] = args
		// console.log('>> message, roomId, userName:', message, roomId, userName)
		console.log('**************************************************')
		if (eventName === 'join-room') {
			socket.join(roomId)
		}
		io.to(roomId).emit(eventName, message, roomId, userName)
	})
}

// *** saving below for now, will delete later ***

// socket.on('join-room', (message, roomId, userName) => {
// 	console.log('>> join-room:', message, roomId, userName)
// 	console.log('**************************************************')
// 	socket.join(roomId)
// 	io.to(roomId).emit('join-room', message, roomId, userName)
// })
