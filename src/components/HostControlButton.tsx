type Props = {
	handler: () => void
	children: React.ReactNode
	color: string
	classes?: string
	disabled?: boolean
	isDialogOpen: boolean
}

export default function HostControlButton({
	handler,
	children,
	color,
	classes = 'w-28 h-6 min-h-6',
	disabled,
	isDialogOpen,
}: Props) {
	return (
		<button
			type='button'
			className={`btn btn-${color} ${classes} btn-outline text-[0.8rem]`}
			onClick={handler}
			disabled={disabled}
			tabIndex={isDialogOpen ? -1 : 0}
		>
			{children}
		</button>
	)
}
