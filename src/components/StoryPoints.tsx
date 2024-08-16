'use client'

import StoryPointButton from './StoryPointButton'

export default function StoryPoints() {
	const storyPointValues = ['?', 0, 1, 2, 3, 5, 8, 13, 20, 40, 100]
	return (
		<div className='w-40 flex flex-col justify-center items-center'>
			<h3 className='text-lg text-center px-4 pt-0 text-gray-300'>
				Choose Your Story Points
			</h3>
			<div className='w-full px-2 py-6 max-h-[36rem] flex flex-col flex-wrap-reverse gap-3 justify-center items-center border-0 border-stone-900'>
				{storyPointValues.map((storyPoint) => (
					<StoryPointButton
						key={storyPoint}
						storyPoint={storyPoint}
					/>
				))}
			</div>
		</div>
	)
}
