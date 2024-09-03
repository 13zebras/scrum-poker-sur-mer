// This file is used to handle the socket.on event

module.exports = (io, socket) => {
	socket.onAny((eventName, options) => {
		const { roomId, message, userName, timeStamp, ...otherOptions } = options
		const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false })
		console.log('>> Time:', currentTime, '\n>>')

		console.log('>> eventName:', eventName)
		console.log('>> options:', options)
		console.log('**************************************************')
		if (eventName === 'join-room') {
			socket.join(roomId)
		}
		io.to(roomId).emit(eventName, {
			message: message,
			userName: userName,
			timeStamp: timeStamp,
			...otherOptions,
		})
	})
}
