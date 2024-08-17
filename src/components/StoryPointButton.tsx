export default function StoryPointButton({
	storyPoint,
}: { storyPoint: number | string }) {
	return (
		<input
			type='radio'
			aria-label={`${storyPoint} points`}
			className='btn btn-primary btn-outline btn-points'
			value={storyPoint}
			name='storypoints'
		/>
	)
}
