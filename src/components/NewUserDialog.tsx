import type { RefObject } from 'react'
import RightArrowIcon from './icons/RightArrowIcon'

interface NewUserDialogProps {
	dialogRef: RefObject<HTMLDialogElement>
	onSubmit: (formValues: { userName: string }) => void
	displayError: boolean
}

export default function NewUserDialog({
	dialogRef,
	onSubmit,
	displayError,
}: NewUserDialogProps) {
	return (
		<dialog ref={dialogRef} className='modal bg-black/50'>
			<div className='modal-box w-full max-w-md h-80 bg-slate-950 border border-slate-800'>
				<h3 className='font-bold text-2xl text-center mt-1'>
					Greetings!
				</h3>
				<p className='pt-6 text-center'>
					Please enter your first name,
				</p>
				<p className='text-center'>then click Join Room!</p>
				<div className='modal-action mt-7'>
					<form
						method='dialog'
						className='w-full flex flex-col items-center gap-2'
						onSubmit={(event) => {
							event.preventDefault()
							const formValues = {
								userName: event.currentTarget.userName.value,
							}
							onSubmit(formValues)
						}}
					>
						<input
							type='text'
							placeholder='Your First Name'
							name='userName'
							className='input input-bordered input-primary mb-1 h-10 w-72 text-gray-200 placeholder:italic placeholder:text-primary/80'
						/>
						<p className='text-error text-base font-semibold italic h-6'>
							{displayError && 'Please enter your name!'}
						</p>
						<button
							type='submit'
							className='btn btn-accent w-72 btn-sm text-lg'
						>
							Join Room
							<RightArrowIcon className='h-6 w-6 inline' />
						</button>
					</form>
				</div>
			</div>
		</dialog>
	)
}
