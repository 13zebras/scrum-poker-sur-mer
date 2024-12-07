import HostControlButton from './HostControlButton'

type HostControlsContainerProps = {
	handleShowPoints: () => void
	disabledShowPointsButton: boolean
	handleClearPoints: () => void
}

export default function HostControlsContainer({
	handleShowPoints,
	disabledShowPointsButton,
	handleClearPoints,
}: HostControlsContainerProps) {
	return (
		<div className='flex flex-row justify-between items-start md:self-end gap-x-12'>
			<div className='flex flex-row flex-wrap-reverse justify-end items-center gap-x-8 gap-y-4'>
				<HostControlButton
					handler={handleShowPoints}
					color='success'
					disabled={disabledShowPointsButton}
				>
					Show points
				</HostControlButton>
				<HostControlButton
					handler={handleClearPoints}
					color='error'
					disabled={!disabledShowPointsButton}
				>
					Clear Points
				</HostControlButton>
			</div>
		</div>
	)
}
