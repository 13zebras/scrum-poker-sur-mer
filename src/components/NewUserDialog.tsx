import type { RefObject } from 'react'
import { useState } from 'react'
import RightArrowIcon from './icons/RightArrowIcon'

interface NewUserDialogProps {
	dialogRef: RefObject<HTMLDialogElement>
	handleOnSubmit: (newUserName: string) => void
	displayError: boolean
	open?: boolean
}

export default function NewUserDialog({
	dialogRef,
	handleOnSubmit,
	displayError,
	...otherProps
}: NewUserDialogProps) {
	const [newUserName, setNewUserName] = useState('')

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()
		setNewUserName(event.target.value)
	}

	return (
		<dialog ref={dialogRef} className='modal bg-black/50' {...otherProps}>
			<div className='modal-box w-full max-w-md h-80 bg-slate-950 border border-slate-800'>
				<h3 className='font-bold text-2xl text-center mt-1'>Greetings!</h3>
				<p className='pt-6 text-center'>Please enter your first name,</p>
				<p className='text-center'>then click Join Room!</p>
				<div className='modal-action mt-7'>
					<form
						role='form'
						method='dialog'
						className='w-full flex flex-col items-center gap-2'
						onSubmit={() => handleOnSubmit(newUserName)}
					>
						<input
							type='text'
							placeholder='Your First Name'
							name='userName'
							className='input input-bordered input-primary mb-1 h-10 w-72 text-gray-200 placeholder:italic placeholder:text-primary/80'
							aria-label='your first name'
							onChange={handleOnChange}
						/>
						<p className='text-error text-base font-semibold italic h-6'>
							{displayError && 'Please enter your name!'}
						</p>
						<button type='submit' className='btn btn-accent w-72 btn-sm text-lg'>
							Join Room
							<RightArrowIcon className='h-6 w-6 inline' />
						</button>
					</form>
				</div>
			</div>
		</dialog>
	)
}
