type NewRoomOrLastRoomProps = {
	nameOfHost: string
	roomUrl: string
	hostRoomUrl: string
	hostRef: React.RefObject<HTMLInputElement>
	handleUseLastRoom: () => void
	setNewName: (name: string) => void
}

export default function NewRoomOrLastRoom({
	nameOfHost,
	roomUrl,
	hostRoomUrl,
	hostRef,
	handleUseLastRoom,
	setNewName,
}: NewRoomOrLastRoomProps) {
	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setNewName(event.target.value)
	}

	if (!nameOfHost) {
		return (
			<div className='w-full h-60 sm:h-80 flex flex-col items-center justify-start animate-fade-in-300'>
				<div className='w-full h-full flex flex-col justify-end items-center'>
					<input
						type='text'
						ref={hostRef}
						placeholder='Enter Your First Name'
						onChange={handleOnChange}
						className='input input-bordered input-info w-full max-w-[22rem] mb-2 text-gray-200 text-xl placeholder:text-lg placeholder:italic placeholder:text-slate-400/70 shadow-xl shadow-black/70'
					/>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full h-60 sm:h-80 flex flex-col items-center justify-start animate-fade-in-300'>
			<div className='w-full h-full flex flex-col justify-end items-center'>
				<div
					className='flex flex-col sm:flex-row items-center justify-center pb-14 text-2xl xs:text-3xl sm:text-4xl text-gray-300 text-center'
					style={{
						textShadow: '1px 1px 1px black, 2px 2px 1px black',
					}}
				>
					<span className='mr-[0.4em]'>Welcome back,</span>
					<span className=''>{nameOfHost}!</span>
				</div>
				{hostRoomUrl && (
					<div
						className='flex flex-col items-center'
						style={{
							textShadow: '1px 1px 1px black, 2px 2px 1px black',
						}}
					>
						<div className='text-2xl text-gray-300 tracking-wider pb-2'>Your Last Room URL:</div>
						<div className='text-sm xs:text-lg sm:text-xl text-gray-300 pb-6'>{roomUrl}</div>
						<button
							type='button'
							className='btn btn-accent w-full max-w-[22rem] h-11 min-h-11 text-lg xs:text-xl shadow-xl shadow-black/70'
							onClick={handleUseLastRoom}
							style={{
								textShadow: 'none',
							}}
						>
							Click to Use Last Room
						</button>
						<div className='text-2xl text-gray-300 pt-[3rem]'>Or if you prefer a new room:</div>
					</div>
				)}
			</div>
		</div>
	)
}
