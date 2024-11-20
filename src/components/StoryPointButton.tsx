interface StoryPointButtonProps {
	allowedPointLabel: string
	selectedStoryPoint: number | null
	handleSelectPoint: (event: React.ChangeEvent<HTMLInputElement>) => void
	disabled: boolean
	isDialogOpen: boolean
}

export default function StoryPointButton({
	allowedPointLabel,
	selectedStoryPoint,
	handleSelectPoint,
	disabled,
	isDialogOpen,
}: StoryPointButtonProps) {
	return (
		<input
			type='radio'
			aria-label={`${allowedPointLabel} points`}
			className='btn btn-primary btn-outline btn-points'
			value={allowedPointLabel}
			name='storypoints'
			checked={selectedStoryPoint === Number(allowedPointLabel)}
			onChange={handleSelectPoint}
			disabled={disabled}
			tabIndex={isDialogOpen ? -1 : 0}
		/>
	)
}
