import type { SVGProps } from 'react'

export default function XIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			role='graphics-symbol'
			{...props}
		>
			<path
				fill='none'
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='3'
				d='m7 7l10 10M7 17L17 7'
			/>
		</svg>
	)
}