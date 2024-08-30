type RoomInfoData = {
	hostName: string
	roomUrl?: string
	userName?: string
}

export default function RoomInfo({ roomUrl, hostName, userName }: RoomInfoData) {
	const isUser = !!userName
	// console.log('%c>>> isUser:', 'color: red', isUser)

	return (
		<div className=' flex flex-row items-center justify-center font-mono text-gray-400 text-sm'>
			{isUser ? (
				<span>
					Your Name: {userName} | Host Name: {hostName}
				</span>
			) : (
				<span>User Room URL: {roomUrl}</span>
			)}
		</div>
	)
}
