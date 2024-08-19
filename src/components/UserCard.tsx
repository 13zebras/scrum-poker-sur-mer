import ChatQuestionOutlineIcon from './icons/ChatQuestionOutlineIcon'

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
		<div className='card bg-base-100 w-28 h-28 shadow-xl rounded-lg border border-slate-600 overflow-hidden'>
			<figure className='z-0 w-28 h-28 object-cover relative block'>
				<img
					src={imageSrc}
					alt='sealife background'
					className='w-28 h-full object-cover'
				/>
			</figure>
			<div className='card-body absolute z-50 py-2 px-2 bg-black/30 justify-around items-center w-full h-full text-white'>
				{showPoints && (
					<h2
						className='card-title text-4xl h-10'
						style={{
							textShadow: '0 0 2px black, 0 0 4px black',
						}}
					>
						{storyPoints}
					</h2>
				)}
				{!showPoints && (
					<ChatQuestionOutlineIcon className='text-[2.5rem] h-10' />
				)}
				<div className='text-base leading-5'>{name}</div>
			</div>
		</div>
	)
}
