import LeftFishIcon from './icons/LeftFishIcon'

type AnimatedFishButtonProps = {
	isFishSwimming: boolean
	setIsFishSwimming: (isFishSwimming: boolean) => void
	isDialogOpen: boolean
}

export default function AnimatedFishButton({
	isFishSwimming,
	setIsFishSwimming,
	isDialogOpen,
}: AnimatedFishButtonProps) {
	const handleFishClick = () => {
		setIsFishSwimming(!isFishSwimming)
	}

	return (
		<div
			className='absolute bottom-3 right-6 tooltip tooltip-fish'
			data-tip='Click to make a little fish swim around your screen. Click again to send him away.'
		>
			<button
				type='button'
				onClick={handleFishClick}
				tabIndex={isDialogOpen ? -1 : 0}
				className='btn btn-ghost size-11 min-h-11 items-start px-1 pb-1 border-0 hover:bg-transparent focus-visible:outline-red-600'
			>
				<LeftFishIcon className='w-full h-full text-gray-300 hover:text-sky-500 hover:scale-110 active:text-sky-600' />
			</button>
		</div>
	)
}
