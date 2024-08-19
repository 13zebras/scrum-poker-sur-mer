interface StoryPointButtonProps {
	storyPoint: number | string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function StoryPointButton({
	storyPoint,
	onChange,
}: StoryPointButtonProps) {
	return (
		<input
			type='radio'
			aria-label={`${storyPoint} points`}
			className='btn btn-primary btn-outline btn-points'
			value={storyPoint}
			name='storypoints'
			onChange={onChange}
		/>
	)
}
