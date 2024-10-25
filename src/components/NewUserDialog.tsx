import type { RefObject } from 'react'
import { useState, useEffect } from 'react'
import RightArrowIcon from './icons/RightArrowIcon'

interface NewUserDialogProps {
	dialogRef: RefObject<HTMLDialogElement>
	user: string
	userId: string
	isRoomIdLastRoomId: boolean
	handleOnSubmit: (newUserName: string, userId: string) => void
	displayError: boolean
	open?: boolean
}

export default function NewUserDialog({
	dialogRef,
	user,
	userId,
	isRoomIdLastRoomId,
	handleOnSubmit,
	displayError,
	...otherProps
}: NewUserDialogProps) {
	const [newUserName, setNewUserName] = useState('')

	const [returningUser, setReturningUser] = useState(false)

	useEffect(() => {
		// console.log('%c>>> userId in NewUserDialog', 'color: #f60', userId)
		// console.log('%c>>> isRoomIdLastRoomId in NewUserDialog', 'color: #5f0', isRoomIdLastRoomId)
		setReturningUser(!!userId && isRoomIdLastRoomId)
		if (userId && isRoomIdLastRoomId) {
			setNewUserName(user)
		}
	}, [userId, isRoomIdLastRoomId, user])

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setNewUserName(event.target.value)
	}

	function handleOnClickNewName() {
		setReturningUser(false)
		setNewUserName('')
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && newUserName) {
			handleOnSubmit(newUserName, userId)
		}
	}

	return (
		<dialog ref={dialogRef} className='modal bg-black/50' {...otherProps}>
			<div className='relative py-8 px-4 flex flex-col justify-start items-center w-[90%] max-w-md h-[25rem] bg-dkblue-700 border border-blue-700 rounded-2xl gap-0'>
				{returningUser ? (
					<div className='mt-4 h-32 flex flex-col justify-end items-center gap-4'>
						<h3 className='font-bold text-3xl text-center'>Welcome back</h3>
						<h3 className='font-bold text-3xl text-center'>{user}!</h3>
					</div>
				) : (
					<div className='h-32 my-4 flex flex-col justify-center items-center gap-0 font-bold text-center'>
						<h3 className='mb-4 text-3xl'>Greetings!</h3>
						<p className=''>Please enter your first name,</p>
						<p className=''>then click Join Room!</p>
					</div>
				)}

				<div className='h-12 w-full flex flex-col justify-start items-center mb-2'>
					{!returningUser && (
						<input
							type='text'
							placeholder='Your First Name'
							name='userName'
							className='input input-bordered input-primary h-10 max-w-72 w-full text-gray-200 placeholder:italic placeholder:text-primary/80 shadow-lg shadow-black/70'
							aria-label='your first name input'
							onChange={handleOnChange}
							onKeyDown={handleKeyDown}
						/>
					)}
				</div>
				<button
					type='button'
					onClick={() => handleOnSubmit(newUserName, userId)}
					className='btn btn-accent max-w-72 w-full h-10 min-h-10 text-xl shadow-lg shadow-black/70'
					disabled={!newUserName && !returningUser}
				>
					Join Room
					<RightArrowIcon className='h-6 w-6 inline' />
				</button>

				{returningUser && (
					<div className='absolute bottom-6 flex flex-row flex-wrap justify-center items-center gap-x-4 gap-y-2 px-4'>
						<span className='italic text-base text-gray-300'>Want to change your name:</span>
						<button
							type='button'
							onClick={handleOnClickNewName}
							className='btn btn-outline btn-primary h-6 min-h-6 text-sm px-3'
						>
							Change Name
						</button>
					</div>
				)}
			</div>
		</dialog>
	)
}
