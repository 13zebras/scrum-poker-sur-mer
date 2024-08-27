import JellyFishOutlineIcon from './icons/JellyFishOutlineIcon'

type CardProps = {
	name: string
	storyPoints: string
	imageSrc: string
	showPoints: boolean
}

export default function UserCard({
	name,
	storyPoints,
	imageSrc,
	showPoints,
}: CardProps) {
	if (storyPoints === '-') showPoints = true

	return (
		<div className='card bg-base-100 size-32 shadow-xl rounded-lg border border-slate-600 overflow-hidden'>
			<figure className='z-0 size-32 object-cover relative block'>
				<img
					src={imageSrc}
					alt={`${name} avatar profile`}
					className='w-32 h-full object-cover'
				/>
			</figure>
			<div className='card-body absolute z-50 py-4 px-2 bg-black/30 justify-start items-center gap-3 w-full h-full text-gray-100'>
				{showPoints && (
					<h2
						className='animate-fade-in-500 card-title text-4xl h-10'
						style={{
							textShadow: '0 0 2px black, 0 0 4px black',
						}}
					>
						{storyPoints}
					</h2>
				)}
				{!showPoints && (
					<JellyFishOutlineIcon
						className='animate-fade-in-500 text-[2.5rem] h-10 text-gray-300 font-bold'
						style={{
							textShadow: '0 0 2px black, 0 0 4px black',
						}}
					/>
				)}
				<div className='text-base leading-5 text-gray-100 h-10 flex items-center'>
					{name}
				</div>
			</div>
		</div>
	)
}
