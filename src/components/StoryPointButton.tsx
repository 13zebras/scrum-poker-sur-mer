type StoryPointButtonProps = {
	allowedPointLabel: string
	selectedStoryPoint: number | null
	handleSelectPoint: (event: React.ChangeEvent<HTMLInputElement>) => void
	disabled: boolean
}

export default function StoryPointButton({
	allowedPointLabel,
	selectedStoryPoint,
	handleSelectPoint,
	disabled,
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
		/>
	)
}
