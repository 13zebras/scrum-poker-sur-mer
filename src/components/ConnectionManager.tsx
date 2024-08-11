import { socket } from '../socket'

export default function ConnectionManager() {
	function connect() {
		socket.connect()
	}

	function disconnect() {
		socket.disconnect()
	}

	return (
		<div className='flex flex-row pt-8 gap-x-16'>
			<button className='w-40 py-1 border-2 border-green-900 rounded-xl bg-green-950 hover:bg-green-900 active:border-green-700 text-zinc-300' type='button' onClick={connect}>
				Connect
			</button>
			<button className='w-40 py-1 border-2 border-red-900 rounded-xl bg-red-950 hover:bg-red-900 active:border-red-700 text-zinc-300' type='button' onClick={disconnect}>
				Disconnect
			</button>
		</div>
	)
}
