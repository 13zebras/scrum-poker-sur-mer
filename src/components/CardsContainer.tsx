'use client'

import UserCard from './UserCard'
import { namesArray } from '@/utils/sampleData'
import { sealifeImages } from '@/utils/imageLists'

export default function CardsContainer() {
	const sampleNames = namesArray.slice(10, 30)
	const storyPointsArray = [0, 1, 2, 3, 5, 8, 13]

	return (
		<div className='py-0 px-0 w-[85%] flex justify-center items-center flex-wrap text-center gap-8 text-gray-300 border-0 border-gray-900'>
			{sampleNames.map((name, index) => {
				const randomNumber = Math.floor(Math.random() * 1000)
				const keyValue = name + randomNumber
				const storyPoints =
					storyPointsArray[index % storyPointsArray.length]
				const imageNumber = index % sealifeImages.length
				const imageSrc = sealifeImages[imageNumber]
				return (
					<UserCard
						key={keyValue}
						name={name}
						storyPoints={storyPoints}
						imageSrc={imageSrc}
					/>
				)
			})}
		</div>
	)
}
