import LeftFishIcon from './icons/LeftFishIcon'

type AnimatedFishButtonProps = {
	isFishSwimming: boolean
	setIsFishSwimming: (isFishSwimming: boolean) => void
}

export default function AnimatedFishButton({
	isFishSwimming,
	setIsFishSwimming,
}: AnimatedFishButtonProps) {
	const handleFishClick = () => {
		setIsFishSwimming(!isFishSwimming)
	}

	return (
		<div
			className='fixed bottom-3 right-6 tooltip tooltip-fish'
			data-tip='Click to make a little fish swim around your screen. Click again to send him away.'
		>
			<button
				type='button'
				onClick={handleFishClick}
				aria-label='AnimatedFish Button'
				className='btn btn-ghost size-11 min-h-11 rounded-full items-start px-1 pb-1 border-0 hover:bg-transparent focus-visible:shadow-focusWhite focus-visible:outline-none'
			>
				<LeftFishIcon
					className='w-full h-full text-gray-300 hover:text-sky-500 hover:scale-110 active:text-sky-600'
					aria-hidden='true'
				/>
			</button>
		</div>
	)
}
