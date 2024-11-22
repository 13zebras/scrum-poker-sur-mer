type CreateNewRoomButtonProps = {
	handleCreateRoom: () => void
}

export default function CreateNewRoomButton({ handleCreateRoom }: CreateNewRoomButtonProps) {
	return (
		<button
			type='button'
			className='btn btn-warning w-full max-w-[20rem] xs:max-w-[22rem] h-11 min-h-11 text-lg xs:text-xl shadow-xl shadow-black/70'
			onClick={handleCreateRoom}
		>
			Create New Room
		</button>
	)
}
