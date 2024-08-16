export default function StoryPointButton({
	storyPoint,
}: { storyPoint: number | string }) {
	return (
		<input
			type='radio'
			aria-label='radio'
			className='btn btn-primary btn-outline btn-points'
			value={storyPoint}
			name='storypoints'
		/>
	)
}
