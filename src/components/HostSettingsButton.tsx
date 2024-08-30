'use client'

import GearIcon from './icons/GearIcon'
import { useRef } from 'react'

type Props = {
	roomId: string
	roomUrl: string
	defaultStoryPointValues: string[]
	allowedPointsEmitter: (allowedStoryPoints: string[], localStorage: boolean) => void
	setAllowedStoryPoints: (allowedStoryPoints: string[]) => void
}

// TODO: Need allowed story points saved in allowedStoryPoints state
// to be passed to HostSettingsButton and have those values set
// as checked in the form.

// TODO: Need radio buttons for Hide Host Card: Yes/No

export default function HostSettingsButton({
	roomId,
	roomUrl,
	defaultStoryPointValues,
	allowedPointsEmitter,
	setAllowedStoryPoints,
}: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget)
		const hostChosenPoints = formData.getAll('storyPoints')
		allowedPointsEmitter(hostChosenPoints as string[], true)
		setAllowedStoryPoints(hostChosenPoints as string[])

		console.log('%c>>> hostChosenPoints', 'color: #5f0', hostChosenPoints)
	}

	return (
		<>
			<button
				type='button'
				onClick={() => {
					if (dialogRef.current) {
						dialogRef.current.showModal()
					}
				}}
				className='btn btn-ghost btn-sm w-8 p-0 hover:bg-transparent'
			>
				<GearIcon className='text-xl hover:text-white' />
			</button>
			<dialog ref={dialogRef} className='modal bg-black/60'>
				<div className='modal-box flex justify-center w-full max-w-[44rem] relative bg-slate-950 border-2 border-slate-800'>
					<button
						type='button'
						className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg'
						onClick={() => {
							if (dialogRef.current) {
								dialogRef.current.close()
							}
						}}
					>
						x
					</button>
					<div className='flex flex-col justify-start items-start gap-8 py-4'>
						<h3 className='font-bold text-3xl self-center text-center pb-4'>Host Settings</h3>

						<div className='text-md font-semibold inline-flex items-center'>
							Current Room URL:
							<span className='font-mono mx-4 font-normal'>{roomUrl}</span>
						</div>
						<div className='text-md font-semibold'>
							Current Room ID:
							<span className='font-mono ml-4 font-normal'>{roomId}</span>
						</div>
						<div className='text-md font-semibold'>
							Hide Host Card:
							<span className='font-mono ml-10 font-normal'>Yes</span>
							<span className='font-mono ml-10 font-normal'>No</span>
						</div>

						<div className='modal-action w-full m-0 pb-2'>
							<form
								method='dialog'
								className='w-full flex flex-col items-center gap-16'
								onSubmit={onSubmitForm}
							>
								<div className='w-full flex flex-col items-center gap-6'>
									<div className='text-base font-semibold self-start w-full'>
										Select Allowed Story Points:
									</div>

									<fieldset className='flex justify-center gap-2 w-full'>
										{defaultStoryPointValues?.map((storyPoint) => (
											<div key={storyPoint}>
												<input
													type='checkbox'
													id={storyPoint.toString()}
													name='storyPoints'
													aria-label={`${storyPoint} points`}
													value={storyPoint}
													className='btn-checkbox'
												/>
												<label
													htmlFor={storyPoint.toString()}
													className='btn btn-primary btn-outline btn-checkbox-label'
												>
													{storyPoint}
												</label>
											</div>
										))}
									</fieldset>
								</div>

								<button
									type='submit'
									className='btn btn-secondary w-72 btn-sm text-lg'
									// onClick={() => setIsCopied(false)}
								>
									Save Settings
								</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
		</>
	)
}
