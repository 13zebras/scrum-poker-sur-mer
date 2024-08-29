import JellyFishOutlineIcon from './icons/JellyFishOutlineIcon'

type CardProps = {
	name: string
	storyPoint: string
	imageSrc: string
	showPoints: boolean
}

export default function UserCard({ name, storyPoint, imageSrc, showPoints }: CardProps) {
	if (storyPoint === '-') showPoints = true

	return (
		<div className='card bg-base-100 size-32 shadow-xl rounded-lg border border-slate-600 overflow-hidden'>
			<figure className='z-0 size-32 object-cover relative block'>
				<img src={imageSrc} alt={`${name} avatar profile`} className='w-32 h-full object-cover' />
			</figure>
			<div className='card-body absolute z-50 py-4 px-2 bg-black/30 justify-start items-center gap-3 w-full h-full text-gray-100'>
				{showPoints && (
					<h2
						className='animate-fade-in-500 card-title text-4xl h-10 tracking-wide'
						style={{
							textShadow: '1px 1px 1px black, 3px 3px 1px black',
						}}
					>
						{storyPoint}
					</h2>
				)}
				{!showPoints && (
					<JellyFishOutlineIcon
						className='animate-fade-in-500 text-[2.5rem] h-10 text-gray-300 font-bold'
						style={{
							textShadow: '1px 1px 1px black, 3px 3px 1px black',
						}}
					/>
				)}
				<div
					className='text-[1.05rem] leading-5 text-gray-100 h-10 flex items-center'
					style={{
						textShadow: '1px 1px 1px black, 2px 2px 1px black',
					}}
				>
					{name}
				</div>
			</div>
		</div>
	)
}
