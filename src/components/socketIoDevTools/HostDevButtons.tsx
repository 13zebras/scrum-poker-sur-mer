import Link from 'next/link'

type HostDevButtonsProps = {
	handleAddRandomUsers: () => void
	handleRemoveRandomUsers: () => void
}

export default function HostDevButtons({
	handleAddRandomUsers,
	handleRemoveRandomUsers,
}: HostDevButtonsProps) {
	return (
		<div className='w-72 absolute top-2 left-0 flex flex-row flex-wrap justify-start items-center gap-2 scale-90'>
			<button
				type='button'
				onClick={handleRemoveRandomUsers}
				className='btn btn-outline-gray h-6 min-h-6 w-32 px-1 text-xs order-1'
			>
				Del Rand Users
			</button>
			<button
				type='button'
				onClick={handleAddRandomUsers}
				className='btn btn-outline-gray h-6 min-h-6 w-32 px-1 text-xs order-3'
			>
				Add Rand Users
			</button>
			<Link href='/host' className='btn btn-outline-gray h-6 min-h-6 w-32 px-1 text-xs order-2'>
				Create Room
			</Link>
		</div>
	)
}
