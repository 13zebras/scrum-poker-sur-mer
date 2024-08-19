type Props = {
	handler: () => void
	children: React.ReactNode
	color: string
}

export default function HostControlButton({ handler, children, color }: Props) {
	return (
		<button
			type='button'
			className={`btn btn-${color} btn-outline btn-xs w-full`}
			onClick={handler}
			// disabled={}
		>
			{children}
		</button>
	)
}
