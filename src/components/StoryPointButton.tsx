interface StoryPointButtonProps {
	storyPoint: string
	selectedStoryPoint: string | null
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	disabled: boolean
}

export default function StoryPointButton({
	storyPoint,
	selectedStoryPoint,
	onChange,
	disabled,
}: StoryPointButtonProps) {
	return (
		<input
			type='radio'
			aria-label={`${storyPoint} points`}
			className='btn btn-primary btn-outline btn-points'
			value={storyPoint}
			name='storypoints'
			checked={selectedStoryPoint === storyPoint.toString()}
			onChange={onChange}
			disabled={disabled}
		/>
	)
}
