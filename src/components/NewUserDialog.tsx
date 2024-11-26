import type { RefObject } from 'react'
import { useState, useEffect } from 'react'
import { socketEmitter } from '@/services/socket'
import { POINT_CODES } from '@/utils/constants'
import RightArrowIcon from './icons/RightArrowIcon'

type UserData = {
	userName: string
	userId: string
	lastRoomId: string
	roomId: string
}

type NewUserDialogProps = {
	dialogRef: RefObject<HTMLDialogElement>
	user: string
	userId: string
	roomId: string
	setUserData: (userData: UserData) => void
	isRoomIdLastRoomId: boolean
	isDialogOpen: boolean
	setIsDialogOpen: (isDialogOpen: boolean) => void
}

export default function NewUserDialog({
	dialogRef,
	user,
	userId,
	roomId,
	setUserData,
	isRoomIdLastRoomId,
	isDialogOpen,
	setIsDialogOpen,
}: NewUserDialogProps) {
	const [displayError, setDisplayError] = useState(false)
	const [newUserName, setNewUserName] = useState('')

	const [isReturningUser, setIsReturningUser] = useState(false)

	useEffect(() => {
		setIsReturningUser(!!userId && isRoomIdLastRoomId)
		if (userId && isRoomIdLastRoomId) {
			setNewUserName(user)
		}
	}, [userId, isRoomIdLastRoomId, user])

	function handleOnSubmit(newUserName: string, userId: string) {
		if (!newUserName) {
			setDisplayError(true)
			return
		}
		const newUserId = userId || crypto.randomUUID()
		socketEmitter('join-room', {
			roomId: roomId,
			message: POINT_CODES.JOIN,
			userName: newUserName,
			userId: newUserId,
		})

		setUserData({
			userName: newUserName,
			userId: newUserId,
			lastRoomId: roomId,
			roomId: roomId,
		})
		if (dialogRef.current) {
			dialogRef.current.close()
		}
		setIsDialogOpen(false)
	}

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setNewUserName(event.target.value)
	}

	function handleOnClickNewName() {
		setIsReturningUser(false)
		setNewUserName('')
	}

	return (
		<dialog ref={dialogRef} className={`modal ${isDialogOpen ? '' : 'hidden'} bg-black/60`}>
			<div className='relative py-8 px-4 flex flex-col justify-start items-center w-[90%] max-w-md h-[25rem] bg-dkblue-700 border border-blue-700 rounded-2xl gap-0'>
				{isReturningUser ? (
					<div className='mt-4 h-32 flex flex-col justify-end items-center gap-4'>
						<h3 className='font-bold text-3xl text-center'>Welcome back</h3>
						<h3 className='font-bold text-3xl text-center'>{user}!</h3>
					</div>
				) : (
					<div className='max-w-72 h-32 mt-4 mb-2 flex flex-col justify-start items-center gap-0 font-bold text-center'>
						<h3 className='mb-4 text-3xl'>Greetings!</h3>
						<p className='text-balance mb-2'>Please enter your first name then click Join Room!</p>
						{displayError && (
							<p id='first-name-error' className='text-red-500 text-center pb-1'>
								You forgot your first name!
							</p>
						)}
					</div>
				)}

				<div className='h-12 w-full flex flex-col justify-start items-center mb-2'>
					{!isReturningUser && (
						<input
							type='text'
							placeholder='Alexander'
							name='userName'
							className='input input-bordered input-primary h-10 max-w-72 w-full text-gray-200 placeholder:italic placeholder:text-primary/80 shadow-lg shadow-black/70'
							aria-label='your first name'
							aria-describedby='first-name-error'
							onChange={handleOnChange}
						/>
					)}
				</div>
				<button
					type='button'
					onClick={() => handleOnSubmit(newUserName, userId)}
					className='btn btn-accent max-w-72 w-full h-10 min-h-10 text-xl shadow-lg shadow-black/70'
				>
					Join Room
					<RightArrowIcon className='h-6 w-6 inline' />
				</button>

				{isReturningUser && (
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
