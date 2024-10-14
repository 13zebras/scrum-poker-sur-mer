// This file is used to handle the socket.on event

module.exports = (io, socket) => {
	socket.onAny((eventName, options) => {
		const { roomId, message, userName, userId, timeStamp, ...otherOptions } = options
		const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false })
		console.log('\n********************************************************')
		console.log('>>\n>> eventName:', eventName)
		console.log('>> Time:', currentTime, '\n>>')

		console.log('>> options:', options)
		console.log('>>\n********************************************************\n')
		if (eventName === 'join-room') {
			socket.join(roomId)
		}
		io.to(roomId).emit(eventName, {
			message: message,
			userName: userName,
			userId: userId,
			timeStamp: timeStamp,
			...otherOptions,
		})
	})
}
