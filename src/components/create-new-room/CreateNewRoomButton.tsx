type CreateNewRoomButtonProps = {
	handleCreateRoom: () => void
	newName: string
}

export default function CreateNewRoomButton({
	handleCreateRoom,
	newName,
}: CreateNewRoomButtonProps) {
	return (
		<button
			type='button'
			className='btn btn-warning w-full h-11 min-h-11 text-lg xs:text-xl shadow-xl shadow-black/70'
			onClick={handleCreateRoom}
			disabled={!newName}
		>
			Click to Create New Room
		</button>
	)
}
