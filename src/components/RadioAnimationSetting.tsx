import type { HostData } from '@/app/host/[roomId]/page'
import { socketEmitter } from '@/services/socket'
import { useParams } from 'next/dist/client/components/navigation'
import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export type AnimationType = 'minimum' | 'medium' | 'high'

type Props = {
	hostData: HostData
	isDialogOpen: boolean
}

export default function RadioAnimationSetting({ hostData, isDialogOpen }: Props): JSX.Element {
	const [animationSetting, setAnimationSetting] = useLocalStorage<string>(
		'scrumPokerLaMerAnimationSetting',
		'medium',
	)
	const [selectedOption, setSelectedOption] = useState<AnimationType>(
		animationSetting as AnimationType,
	)
	// console.log('%c>>> animationSetting radio', 'color: red', animationSetting)
	const params = useParams()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newAnimationSetting = event.target.value as AnimationType
		setSelectedOption(newAnimationSetting)
		setAnimationSetting(newAnimationSetting)
		socketEmitter('animation-setting', {
			roomId: params.roomId as string,
			message: newAnimationSetting,
			userName: hostData.nameOfHost,
			userId: hostData.userId,
		})
	}

	return (
		<fieldset className='flex items-center gap-8 w-full text-md font-semibold p-[2px]'>
			<span>Motion / Animation?</span>
			<label className='flex items-center px-1 rounded-md focus-within:outline focus-within:outline-rose-600 focus-within:outline-offset-2'>
				<input
					type='radio'
					name='animationSetting'
					value='minimum'
					aria-label='Minimum, Motion Reduced'
					checked={selectedOption === 'minimum'}
					onChange={handleChange}
					className='size-3 rounded-full appearance-none outline outline-2 outline-offset-2 outline-gray-400 checked:bg-rose-600 checked:outline-rose-500 mr-3'
					tabIndex={isDialogOpen ? 0 : -1}
				/>
				Minimum
			</label>

			<label className='flex items-center px-1 rounded-md focus-within:outline focus-within:outline-rose-600 focus-within:outline-offset-2'>
				<input
					type='radio'
					name='animationSetting'
					value='medium'
					aria-label='Medium Animation'
					checked={selectedOption === 'medium'}
					onChange={handleChange}
					className='size-3 rounded-full appearance-none outline outline-2 outline-offset-2 outline-gray-400 checked:bg-rose-600 checked:outline-rose-500 mr-3'
					tabIndex={isDialogOpen ? 0 : -1}
				/>
				Medium
			</label>
			<label className='flex items-center px-1 rounded-md focus-within:outline focus-within:outline-rose-600 focus-within:outline-offset-2'>
				<input
					type='radio'
					name='animationSetting'
					value='high'
					aria-label='High Animation'
					checked={selectedOption === 'high'}
					onChange={handleChange}
					className='size-3 rounded-full appearance-none outline outline-2 outline-offset-2 outline-gray-400 checked:bg-rose-600 checked:outline-rose-500 mr-3'
					tabIndex={isDialogOpen ? 0 : -1}
					// tabIndex={isDialogOpen ? undefined : -1}
				/>
				High
			</label>
		</fieldset>
	)
}
