import type { RefObject } from 'react'
import RightArrowIcon from './icons/RightArrowIcon'

interface NewUserDialogProps {
	dialogRef: RefObject<HTMLDialogElement>
	handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onJoinClick: () => void
}

export default function NewUserDialog({
	dialogRef,
	handleOnChange,
	onJoinClick,
}: NewUserDialogProps) {
	return (
		<dialog ref={dialogRef} className='modal bg-black/50'>
			<div className='modal-box w-full max-w-md h-80 bg-slate-950 border border-slate-800'>
				<h3 className='font-bold text-2xl text-center mt-2'>
					Greetings!
				</h3>
				<p className='pt-6 text-center'>
					Please enter your first name,
				</p>
				<p className='text-center'>then click Join Room!</p>
				<div className='modal-action mt-7'>
					<form
						method='dialog'
						className='w-full flex flex-col items-center gap-8'
					>
						{/* <label className='form-control w-full max-w-xs items-center'>
							<div className='label'>
								<span className='label-text'>
									Please enter your first name to join
								</span>
							</div> */}
						<input
							type='text'
							placeholder='Your First Name'
							onChange={handleOnChange}
							className='input input-bordered input-primary h-10 w-72 text-gray-200 placeholder:italic placeholder:text-primary/80'
						/>
						{/* </label> */}
						<button
							type='submit'
							className='btn btn-accent w-72 btn-sm text-lg'
							onClick={onJoinClick}
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
