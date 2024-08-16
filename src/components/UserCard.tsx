import Image from 'next/image'

// import sealife from '../../public/sealife-images/sealife_250px_001.webp'

type CardProps = {
	name: string
	storyPoints: number
	imageSrc: string
}

export default function UserCard({ name, storyPoints, imageSrc }: CardProps) {
	return (
		<div className='card bg-base-100 w-28 h-28 shadow-xl rounded-lg border-2 border-gray-900 overflow-hidden'>
			<figure className='z-0 w-28 h-28 object-cover relative block'>
				<Image
					src={imageSrc}
					fill
					alt='sealife image background'
					style={{
						objectFit: 'cover', // cover, contain, none
					}}
				/>
			</figure>
			<div className='card-body absolute z-50 py-2 px-2 bg-black/40 justify-around items-center w-full h-full text-white'>
				{/* <MdiStarOutline className='absolute left-[25%] top-6 text-red-500 text-xl' /> */}
				<h2
					className='card-title text-4xl'
					style={{
						textShadow: '0 0 2px black, 0 0 4px black',
					}}
				>
					{storyPoints}
				</h2>
				<div className='text-base leading-5'>{name}</div>
			</div>
		</div>
	)
}
