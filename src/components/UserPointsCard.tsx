import JellyFishOutlineIcon from './icons/JellyFishOutlineIcon'
import { SealifeImage } from './SealifeImage'
import { motion, AnimatePresence } from 'framer-motion'
import CardsContainer from './CardsContainer'

type CardProps = {
	name: string
	storyPoint: string
	// imageNumber: number
	userId: string
	index: number
	numberOfCards: number
	numberOfBlanks: number
	showPoints: boolean
	containerWidth: number
	containerBottom: number
	viewportHeight: number
}

export default function UserPointsCard({
	name,
	storyPoint,
	// imageNumber,
	userId,
	index,
	numberOfCards,
	numberOfBlanks,
	showPoints,
	containerWidth,
	containerBottom,
	viewportHeight,
}: CardProps) {
	// '--' is a blank card
	const isBlank = storyPoint === '--'

	// isMoveBlank is used to determine if the card is removed to the bottom
	// of the container and scaled to 0.8 in size
	const isMoveBlank = showPoints && isBlank

	const cardSize = 128
	const blankGap = 3
	const blankScale = 0.8
	const blankSize = Math.floor(cardSize * blankScale)
	const showHowMuchBlankCard = 0.42

	const blankPosition = isMoveBlank ? 'absolute' : 'relative'

	// need the index of the first blank card to get the proper seuquence and delay
	const firstblankIndex = numberOfBlanks > 0 ? numberOfCards - numberOfBlanks : 0

	// this card is how many cards from the end card?
	const numberFromLastCard = numberOfCards - index - 1

	// blank cards are 80% of the size of the other cards
	const scaleAnimate = isMoveBlank ? blankScale : 1

	// How many blank cards can fit in the Card Container width?
	const maxBlanksPerRow = Math.floor(containerWidth / (blankSize + blankGap))
	// console.log('%c>>> containerWidth', 'color: #a08', containerWidth)

	// Maximum number of rows would be 1 card per row with a very narrow container
	// which would equal the number of blank cards. The ideal number of rows is reached
	// when the maxBlanksPerRow exceeds the numberOfBlanks / i, where i is the number of rows.
	let numberOfRows = 1 // Default to 1 row
	for (let i = 1; i < numberOfBlanks; i++) {
		const blanksPerRow = Math.ceil(numberOfBlanks / i)
		if (maxBlanksPerRow >= blanksPerRow) {
			numberOfRows = i
			break
		}
	}

	const numberOfBlanksPerRow = Math.ceil(numberOfBlanks / numberOfRows)

	// scalingPositionOffset is shifting rows down due to scaling of cards.
	const scalingPositionOffset = ((cardSize - blankSize) * showHowMuchBlankCard) / 2
	// const scalingPositionOffset = 0

	const lastRowBottomNoOffset = Math.floor(
		-1 * (numberOfRows - 1) * blankSize * showHowMuchBlankCard,
	)

	const lastRowDistanceToViewportBottom = viewportHeight + lastRowBottomNoOffset - containerBottom

	let containerBottomOffset = 30
	if (lastRowDistanceToViewportBottom > 100) {
		containerBottomOffset = Math.floor(lastRowDistanceToViewportBottom / 3)
	}

	const scalingBottomOffset = -1 * (scalingPositionOffset + blankSize + containerBottomOffset)

	// The right position of the blank card is determined by the
	// number of cards from the last card in the row.
	const rightAdjustment = 6 // the cards are consistently -6px outside the container
	const blankRightAnimate = isMoveBlank
		? Math.floor(
				(numberFromLastCard % numberOfBlanksPerRow) * (blankSize + blankGap) -
					scalingPositionOffset +
					rightAdjustment,
			)
		: 0

	// What row is this card in? Top row is 0.
	const thisCardRow = isMoveBlank ? Math.floor(numberFromLastCard / numberOfBlanksPerRow) : 0

	// Bottom position is determined by the row number times the portion
	// of the card that we want to show, in this case 40%. And we are placing
	// the top row at bottom = 0, and all lower rows below the bottom = 0.
	const thisCardRowBottom = isMoveBlank
		? Math.floor(-1 * thisCardRow * blankSize * showHowMuchBlankCard + scalingBottomOffset)
		: 0

	const lastRowBottom = isMoveBlank
		? Math.floor(-1 * (numberOfRows - 1) * blankSize * showHowMuchBlankCard + scalingBottomOffset)
		: 0
	// console.log(
	// 	'%c>>> thisCardRow, thisCardRowBottom, lastRowBottom, blankRightAnimate',
	// 	'color: #0f3',
	// 	thisCardRow,
	// 	thisCardRowBottom,
	// 	lastRowBottom,
	// 	blankRightAnimate,
	// )
	// blank cards do not turn around the y axis.
	// Cards with points turn but in a random direction, to the left or to the right
	const rotateY = isMoveBlank || !showPoints ? 0 : (Math.random() < 0.5 ? -1 : 1) * 180

	// blank cards are delayed so they slide left in a staggered sequence
	const blankMoveDuration = 0.25
	const baseBlankMoveDelay = 0.5
	const blankMoveDelay = isMoveBlank
		? baseBlankMoveDelay + (index - firstblankIndex) * blankMoveDuration
		: 0

	// first blank card ends it's movement from beginning of animation
	const totalblankMoveTime = baseBlankMoveDelay + numberOfBlanks * blankMoveDuration

	// cards with points take 0.5s to flip and show their points
	const animateDuration = 0.5

	// flip occurs 0.1s after the last blankcard has finished moving
	const animateDelay = isMoveBlank || !showPoints ? 0 : 0.4 + totalblankMoveTime

	// blank cards rows are stacked on top of each other so z-index needs to
	// increase from top card row to bottom card row going down..
	// cards with points are not stacked, so z-index is 0
	const blankZIndex = isMoveBlank ? 50 - thisCardRow : 0

	return (
		<AnimatePresence>
			<motion.div
				initial={{
					scale: 0,
					right: 0,
					bottom: lastRowBottom,
					rotateY: rotateY,
					opacity: 0.1,
				}}
				animate={{
					scale: scaleAnimate,
					right: blankRightAnimate,
					bottom: thisCardRowBottom,
					rotateY: 0,
					opacity: 1,
				}}
				exit={{ opacity: 0, scale: 0 }}
				transition={{
					duration: blankMoveDuration,
					delay: blankMoveDelay,
					ease: 'easeInOut',
					rotateY: {
						duration: animateDuration,
						delay: animateDelay,
					},
					opacity: {
						duration: animateDuration,
						delay: 0,
					},
					scale: !isMoveBlank
						? {
								type: 'spring',
								damping: 13,
								stiffness: 80,
								mass: 2,
								restDelta: 0.001,
								delay: 0,
							}
						: {
								type: 'tween',
								duration: 0.5,
								ease: 'easeInOut',
								delay: 0,
							},
				}}
				className={`card card-points ${blankPosition}`}
				style={{ zIndex: blankZIndex }}
			>
				<motion.figure
					initial={{ opacity: showPoints ? 1 : 0.8 }}
					animate={{ opacity: showPoints ? 0.5 : 0.8 }}
					transition={{
						duration: showPoints ? 0.2 : 0,
						delay: showPoints ? animateDelay : 0,
						ease: 'linear',
					}}
					className='size-[7.5rem] object-cover absolute -inset-[2px]'
				>
					<SealifeImage userId={userId} alt={`${name} avatar profile`} />
				</motion.figure>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: animateDuration, delay: animateDelay, ease: 'easeInOut' }}
					className={`card-body card-body-points ${
						isMoveBlank ? 'text-gray-300' : 'text-gray-100'
					}`}
				>
					{showPoints || isBlank ? (
						<h2
							className='card-title text-[3rem] h-12 tracking-wide'
							style={{
								textShadow: '1px 1px 1px black, 3px 3px 1px black',
							}}
						>
							{storyPoint}
						</h2>
					) : (
						<JellyFishOutlineIcon className='text-[3rem] h-12' />
					)}

					<div
						className='text-[1.15rem] font-bold leading-5 h-10 flex items-center'
						style={{
							textShadow: '1px 1px 1px black, 2px 2px 1px black',
						}}
					>
						{name}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}
