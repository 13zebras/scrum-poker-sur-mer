type NewRoomOrLastRoomProps = {
	nameOfHost: string
	roomUrl: string
	hostRoomUrl: string
	hostRef: React.RefObject<HTMLInputElement>
	handleUseLastRoom: () => void
	setNewName: (name: string) => void
	nameError: boolean
}

export default function NewRoomOrLastRoom({
	nameOfHost,
	roomUrl,
	hostRoomUrl,
	hostRef,
	handleUseLastRoom,
	setNewName,
	nameError,
}: NewRoomOrLastRoomProps) {
	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setNewName(event.target.value)
	}

	if (!nameOfHost) {
		return (
			<div className='w-full h-60 sm:h-80 flex flex-col items-center justify-start motion-safe:animate-fade-in-300'>
				<div className='w-full h-full flex flex-col justify-end items-center'>
					<label
						htmlFor='nameOfHost'
						className={`w-full max-w-[21rem] text-center pb-6 text-lg ${nameError ? 'text-red-500' : 'text-gray-300'}`}
					>
						{nameError
							? 'You Forgot to Enter Your First Name in the Box Below. Please Try Again.'
							: 'Please Enter Your First Name:'}
					</label>
					<input
						type='text'
						id='nameOfHost'
						ref={hostRef}
						placeholder='Alexandria'
						onChange={handleOnChange}
						className='input input-bordered input-info w-full max-w-[20rem] xs:max-w-[22rem] mb-2 text-gray-200 text-xl placeholder:text-lg placeholder:italic placeholder:text-slate-400/70 shadow-xl shadow-black/70'
					/>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full h-[17rem] sm:h-80 flex flex-col items-center justify-start motion-safe:animate-fade-in-300'>
			<div className='w-full h-full flex flex-col justify-end items-center'>
				<p
					className='w-full text-center text-balance px-6 pb-14 text-2xl xs:text-3xl sm:text-4xl text-gray-300'
					style={{
						textShadow: '1px 1px 1px black, 2px 2px 1px black',
					}}
				>
					Welcome back, <span className='text-nowrap'>{nameOfHost}!</span>
				</p>
				{hostRoomUrl && (
					<div
						className='flex flex-col items-center w-full'
						style={{
							textShadow: '1px 1px 1px black, 2px 2px 1px black',
						}}
					>
						<div className='w-full text-center text-xl xs:text-2xl text-gray-300 tracking-wider pb-2'>
							Your Last Room URL:
						</div>
						<div className='w-full text-center text-sm xs:text-lg sm:text-xl text-gray-300 pb-6'>
							{roomUrl}
						</div>
						<button
							type='button'
							className='btn btn-accent w-full max-w-[20rem] xs:max-w-[22rem] h-11 min-h-11 text-lg xs:text-xl shadow-xl shadow-black/70'
							onClick={handleUseLastRoom}
							style={{
								textShadow: 'none',
							}}
						>
							Click to Use Last Room
						</button>
						<div className='text-xl xs:text-2xl text-gray-300 pt-[3rem]'>
							Or if you prefer a new room:
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
