'use client'

import GearIcon from './icons/GearIcon'
import RadioShowHide from './RadioShowHide'
import RadioAnimationSetting from './RadioAnimationSetting'
import { useRef, useState } from 'react'
import type { HostData } from '@/app/host/[roomId]/page'
import removeAllLocalStorageData from '@/utils/helpers/removeAllLocalStorageData'
import XIcon from './icons/XIcon'

type Props = {
	hostData: HostData
	defaultStoryPointValues: string[]
	allowedPointsEmitter: (allowedStoryPoints: string[], localStorage: boolean) => void
	allowedStoryPoints: string[]
	setAllowedStoryPoints: (allowedStoryPoints: string[]) => void
	showHostCard: boolean
	handleShowHostCard: (isShow: boolean) => void
}

export default function HostSettings({
	hostData,
	defaultStoryPointValues,
	allowedPointsEmitter,
	allowedStoryPoints,
	setAllowedStoryPoints,
	showHostCard,
	handleShowHostCard,
}: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
		setIsDialogOpen(false)
		const formData = new FormData(event.currentTarget)

		const hostChosenPoints = formData.getAll('storyPoints') as string[]

		if (hostChosenPoints.length > 0) {
			allowedPointsEmitter(hostChosenPoints, true)
			setAllowedStoryPoints(hostChosenPoints)
		}
	}

	function handleClearAllUsersData() {
		removeAllLocalStorageData()
		window.location.reload()
	}

	return (
		<div
			className='absolute top-6 right-10 sm:right-16 tooltip tooltip-bottom'
			data-tip='Host Settings'
		>
			<button
				type='button'
				aria-label='Host Settings Button'
				onClick={() => {
					if (dialogRef.current) {
						dialogRef.current.showModal()
						setIsDialogOpen(true)
					}
				}}
				className='btn btn-ghost size-8 min-h-8 p-1 border-0 rounded-full hover:bg-transparent focus-visible:outline-none focus-visible:shadow-focusWhite'
			>
				<GearIcon className='w-full h-full hover:text-sky-400 hover:scale-110' aria-hidden='true' />
			</button>
			<dialog ref={dialogRef} className={`modal ${isDialogOpen ? '' : 'hidden'} bg-black/60`}>
				<div className='modal-box flex flex-col items-center justify-center gap-8 w-11/12 max-w-[44rem] mx-auto bg-slate-950 border-2 border-slate-600 text-gray-200 relative'>
					<div
						className='absolute top-4 right-3 sm:right-4 tooltip tooltip-bottom'
						data-tip='Close'
					>
						<button
							type='button'
							className='btn btn-ghost size-6 min-h-6 p-0 border-0 hover:bg-transparent'
							aria-label='Close Button'
							onClick={() => {
								if (dialogRef.current) {
									dialogRef.current.close()
									setIsDialogOpen(false)
								}
							}}
						>
							<XIcon
								className='w-full h-full hover:text-rose-500 hover:scale-110'
								aria-hidden='true'
							/>
						</button>
					</div>
					<div className='flex flex-col justify-start items-start gap-6 py-4'>
						<h3 className='font-bold text-3xl self-center text-center pb-4'>Host Settings</h3>

						<div className='text-md font-semibold inline-flex items-center'>
							Host Room URL:
							<span className='font-mono ml-4 font-normal'>{hostData.hostRoomUrl}</span>
						</div>
						<div className='text-md font-semibold'>
							Users Room URL:
							<span className='font-mono ml-4 font-normal'>{hostData.roomUrl}</span>
						</div>

						<div className='modal-action w-full m-0'>
							<form
								method='dialog'
								className='w-full flex flex-col items-center gap-8'
								onSubmit={onSubmitForm}
							>
								<div className='w-full flex flex-col items-center gap-6 pb-2'>
									<RadioAnimationSetting hostData={hostData} />
									<RadioShowHide
										selectedOption={showHostCard ? 'show' : 'hide'}
										onChange={(value: 'show' | 'hide') => handleShowHostCard(value === 'show')}
									/>
									<div className='flex justify-between items-center text-md font-semibold self-start w-full'>
										Select ALL Allowed Story Points:
										<div className='flex items-center'>
											<span className='mt-1 ml-8 text-3xl text-rose-500 leading-none'>•</span>
											<span className='ml-1 text-sm text-gray-300 italic'>= current selection</span>
										</div>
									</div>

									<fieldset className='flex justify-center gap-2 w-full'>
										{defaultStoryPointValues?.map((storyPoint) => (
											<div
												key={storyPoint}
												className='flex flex-col items-center relative focus-within:outline focus-within:outline-indigo-500 focus-within:outline-offset-1 rounded-lg'
											>
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
													<span className='absolute top-[-1px] right-1 text-2xl text-rose-500 leading-none'>
														•
													</span>
												)}
											</div>
										))}
									</fieldset>
								</div>

								<button type='submit' className='btn btn-accent w-48 min-h-8 h-8 text-lg'>
									Save & Close
								</button>
							</form>
						</div>
					</div>
					<div className='w-5/6 h-px bg-slate-600 mt-4' />
					<div className='flex flex-col justify-center items-center gap-4 pt-6 pb-3 max-w-[32rem] w-full'>
						<div className='flex justify-center items-center gap-6'>
							<span className='font-semibold text-sm tracking-wider'>
								<span className='text-error font-bold text-base mr-2'>Caution!</span>
								This action cannot be undone:
							</span>
							<button
								type='button'
								className='btn btn-outline btn-info text-sm h-6 min-h-6 w-44'
								onClick={handleClearAllUsersData}
							>
								Clear All Users Data
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</div>
	)
}
