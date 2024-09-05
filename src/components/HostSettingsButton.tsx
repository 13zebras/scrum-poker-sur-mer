'use client'

import GearIcon from './icons/GearIcon'

import { useRef } from 'react'

type Props = {
	roomId: string
	roomUrl: string
	defaultStoryPointValues: string[]
	allowedPointsEmitter: (allowedStoryPoints: string[], localStorage: boolean) => void
	allowedStoryPoints: string[]
	setAllowedStoryPoints: (allowedStoryPoints: string[]) => void
}

// TODO Send output of Radio buttons for Hide Host Card to host

export default function HostSettingsButton({
	roomId,
	roomUrl,
	defaultStoryPointValues,
	allowedPointsEmitter,
	allowedStoryPoints,
	setAllowedStoryPoints,
}: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget)
		const hideHostCard = formData.getAll('hideHostCard')
		const hostChosenPoints = formData.getAll('storyPoints') as string[]
		console.log('%c>>> hideHostCard', 'color: #f60', hideHostCard)
		console.log('%c>>> hostChosenPoints', 'color: #5f0', hostChosenPoints)
		if (hostChosenPoints.length > 0) {
			allowedPointsEmitter(hostChosenPoints, true)
			setAllowedStoryPoints(hostChosenPoints)
		}
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
				<GearIcon className='text-xl hover:text-sky-400' />
			</button>
			<dialog ref={dialogRef} className='modal bg-black/60'>
				<div className='modal-box flex justify-center w-full max-w-[44rem] relative bg-slate-950 border-2 border-slate-800'>
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

						<div className='modal-action w-full m-0 pb-2'>
							<form
								method='dialog'
								className='w-full flex flex-col items-center gap-16'
								onSubmit={onSubmitForm}
							>
								<div className='w-full flex flex-col items-center gap-4'>
									<fieldset className='flex items-center gap-8 w-full text-md font-semibold pb-4'>
										Hide Host Card:
										<div className='flex items-center'>
											<input
												type='radio'
												id='yes'
												name='hideHostCard'
												value='yes'
												aria-label='Hide Host Card: Yes'
												className='size-3 rounded-full appearance-none outline outline-1 outline-offset-1 outline-gray-400 checked:bg-rose-600 checked:outline-rose-500'
											/>
											<label htmlFor='yes' className='ml-2'>
												Yes
											</label>
										</div>
										<div className='flex items-center'>
											<input
												type='radio'
												id='no'
												name='hideHostCard'
												value='no'
												aria-label='Hide Host Card: No'
												className='size-3 rounded-full appearance-none outline outline-1 outline-offset-1 outline-gray-400 checked:bg-rose-600 checked:outline-rose-500'
											/>
											<label htmlFor='no' className='ml-2'>
												No
											</label>
										</div>
									</fieldset>
									<div className='flex items-center text-md font-semibold self-start w-full'>
										Select Allowed Story Points:
										<span className='ml-8 text-xl text-rose-500 leading-none'>•</span>
										<span className='ml-1 text-sm text-gray-400 italic'>= current</span>
									</div>

									<fieldset className='flex justify-center gap-2 w-full'>
										{defaultStoryPointValues?.map((storyPoint) => (
											<div key={Math.random()} className='flex flex-col items-center relative'>
												<input
													type='checkbox'
													id={storyPoint}
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
												{allowedStoryPoints.includes(storyPoint) && (
													<span className='absolute top-0 right-1 text-lg text-rose-500 leading-none'>
														•
													</span>
												)}
											</div>
										))}
									</fieldset>
								</div>

								<button type='submit' className='btn btn-secondary w-72 btn-sm text-lg'>
									Save & Close
								</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
		</>
	)
}
