type Props = {
	handler: () => void
	children: React.ReactNode
	color: string
	classes?: string
}

export default function HostControlButton({ handler, children, color, classes = 'w-28' }: Props) {
	return (
		<button
			type='button'
			className={`btn btn-${color} btn-outline btn-xs ${classes}`}
			onClick={handler}
			// disabled={}
		>
			{children}
		</button>
	)
}
