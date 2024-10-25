'use client'

import GearIcon from './icons/GearIcon'
import RadioShowHide from './RadioShowHide'
import { useRef } from 'react'
import removeAllLocalStorageData from '@/utils/helpers/removeAllLocalStorageData'
type Props = {
	hostRoomUrl: string
	roomUrl: string
	defaultStoryPointValues: string[]
	allowedPointsEmitter: (allowedStoryPoints: string[], localStorage: boolean) => void
	allowedStoryPoints: string[]
	setAllowedStoryPoints: (allowedStoryPoints: string[]) => void
	showHostCard: boolean
	handleShowHostCard: (isShow: boolean) => void
}

export default function HostSettingsButton({
	hostRoomUrl,
	roomUrl,
	defaultStoryPointValues,
	allowedPointsEmitter,
	allowedStoryPoints,
	setAllowedStoryPoints,
	showHostCard,
	handleShowHostCard,
}: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget)

		const hostChosenPoints = formData.getAll('storyPoints') as string[]

		if (hostChosenPoints.length > 0) {
			allowedPointsEmitter(hostChosenPoints, true)
			setAllowedStoryPoints(hostChosenPoints)
		}
	}

	function handleClearAllUsersData() {
		removeAllLocalStorageData()
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
				className='btn btn-ghost size-6 min-h-6 p-0 border-0 hover:bg-transparent'
			>
				<GearIcon className='w-full h-full hover:text-sky-400 hover:scale-110' />
			</button>
			<dialog ref={dialogRef} className='modal bg-black/60'>
				<div className='modal-box flex flex-col items-center justify-center gap-8 w-full max-w-[42rem] relative bg-slate-950 border-2 border-slate-700 text-gray-300'>
					<div className='flex flex-col justify-start items-start gap-6 py-4 px-1 max-w-[36rem] w-full'>
						<h3 className='font-bold text-3xl self-center text-center pb-4'>Host Settings</h3>

						<div className='text-md font-semibold inline-flex items-center'>
							Host Room URL:
							<span className='font-mono ml-4 font-normal'>{hostRoomUrl}</span>
						</div>
						<div className='text-md font-semibold'>
							Users Room URL:
							<span className='font-mono ml-4 font-normal'>{roomUrl}</span>
						</div>

						<div className='modal-action w-full m-0'>
							<form
								method='dialog'
								className='w-full flex flex-col items-center gap-8'
								onSubmit={onSubmitForm}
							>
								<div className='w-full flex flex-col items-center gap-6 pb-2'>
									<RadioShowHide
										selectedOption={showHostCard ? 'show' : 'hide'}
										onChange={(value: 'show' | 'hide') => handleShowHostCard(value === 'show')}
									/>
									<div className='flex items-center text-md font-semibold self-start w-full'>
										Select Allowed Story Points:
										<span className='ml-8 text-xl text-rose-500 leading-none'>•</span>
										<span className='ml-1 text-sm text-gray-350 italic'>= current</span>
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

								<button type='submit' className='btn btn-accent w-72 min-h-9 h-9 text-xl'>
									Save & Close
								</button>
							</form>
						</div>
					</div>
					<div className='w-5/6 h-px bg-slate-600' />
					<div className='flex flex-col justify-center items-center gap-4 pt-1 pb-3 max-w-[32rem] w-full'>
						<div className='flex justify-center items-center gap-6'>
							<span className='font-semibold text-sm tracking-wider'>
								<span className='text-error font-bold text-base mr-2'>Caution!</span>
								This action cannot be undone:
							</span>
							<button
								type='button'
								className='btn btn-outline btn-info text-xs h-5 min-h-5 w-40'
								onClick={handleClearAllUsersData}
							>
								Clear All Users Data
							</button>
						</div>
						{/* <div className='w-full flex justify-center items-center gap-6'>
							<button
								type='button'
								className='btn btn-outline btn-info text-xs h-6 min-h-6 w-44'
								onClick={handleClearAllUsersData}
							>
								Clear All Users Data
							</button>
						</div> */}
					</div>
				</div>
			</dialog>
		</>
	)
}
