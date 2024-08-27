// This file is used to handle the socket.on event

module.exports = (io, socket) => {
	socket.onAny((eventName, roomId, ...args) => {
		console.log('>> eventName:', eventName)
		console.log('>> roomId:', roomId)
		console.log('>> args:', args)
		const [message, userName, timeStamp] = args
		// console.log('>> message, userName:', message, userName)
		console.log('**************************************************')
		if (eventName === 'join-room') {
			socket.join(roomId)
		}
		io.to(roomId).emit(eventName, message, userName, timeStamp, ...args)
	})
}

// *** saving below for now, will delete later ***

// socket.on('join-room', (message, roomId, userName) => {
// 	console.log('>> join-room:', message, roomId, userName)
// 	console.log('**************************************************')
// 	socket.join(roomId)
// 	io.to(roomId).emit('join-room', message, roomId, userName)
// })
