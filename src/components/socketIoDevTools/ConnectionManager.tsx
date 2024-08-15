import { useEffect, useState } from 'react'
import { socket } from '../../socket'

export default function ConnectionManager() {
	const [isConnected, setIsConnected] = useState(false)
	const [transport, setTransport] = useState('N/A')

	useEffect(() => {
		if (socket.connected) {
			onConnect()
		}

		function onConnect() {
			setIsConnected(true)
			setTransport(socket.io.engine.transport.name)

			socket.io.engine.on('upgrade', (transport) => {
				setTransport(transport.name)
			})
		}

		function onDisconnect() {
			setIsConnected(false)
			setTransport('N/A')
		}

		socket.on('connect', onConnect)
		socket.on('disconnect', onDisconnect)

		return () => {
			socket.off('connect', onConnect)
			socket.off('disconnect', onDisconnect)
		}
	}, [])

	function connect() {
		socket.connect()
	}

	function disconnect() {
		socket.disconnect()
	}

	return (
		<div>
			<div className='pt-4 flex flex-col text-zinc-400'>
				<span className='font-mono'>Socket ID: {socket.id}</span>
				<span className=''>Transport: {transport}</span>
				<span className='text-zinc-300'>
					Status: {isConnected ? 'connected' : 'disconnected'}
				</span>
			</div>
			<div className='flex flex-row pt-4 gap-x-12'>
				<button
					className='btn btn-accent btn-sm w-40'
					type='button'
					onClick={connect}
					disabled={isConnected}
				>
					Connect
				</button>
				<button
					className='btn btn-secondary btn-sm w-40'
					type='button'
					onClick={disconnect}
					disabled={!isConnected}
				>
					Disconnect
				</button>
			</div>
		</div>
	)
}
