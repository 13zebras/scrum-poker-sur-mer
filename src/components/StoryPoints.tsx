'use client'

import StoryPointButton from './StoryPointButton'

export default function StoryPoints({
	setSelectedStoryPoint,
}: { setSelectedStoryPoint: (value: string) => void }) {
	const storyPointValues = ['?', 0, 1, 2, 3, 5, 8, 13, 20, 40, 100]

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedStoryPoint(event.target.value)
	}

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
						onChange={handleChange}
					/>
				))}
				{/* <div className='py-4 text-xl text-center text-red-600'>
					{selectedStoryPoint}
				</div> */}
			</div>
		</div>
	)
}
