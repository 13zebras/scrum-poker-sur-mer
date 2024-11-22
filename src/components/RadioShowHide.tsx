type RadioOption = 'show' | 'hide'

type Props = {
	selectedOption: 'show' | 'hide'
	onChange: (value: 'show' | 'hide') => void
}

export default function RadioShowHide({ selectedOption, onChange }: Props): JSX.Element {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value as RadioOption)
	}

	return (
		<fieldset className='flex items-center gap-8 w-full text-md font-semibold'>
			<span>Show / Hide Host Card?</span>
			<label className='flex items-center px-1 rounded-md focus-within:outline focus-within:outline-rose-500 focus-within:outline-offset-2'>
				<input
					type='radio'
					name='showHideHostCard'
					value='show'
					aria-label='Show Host Card'
					checked={selectedOption === 'show'}
					onChange={handleChange}
					className='size-3 rounded-full appearance-none outline outline-2 outline-offset-2 outline-gray-400 checked:bg-rose-600 checked:outline-rose-500 mr-3'
				/>
				Show
			</label>
			<label className='flex items-center px-1 rounded-md focus-within:outline focus-within:outline-rose-500 focus-within:outline-offset-2'>
				<input
					type='radio'
					name='showHideHostCard'
					value='hide'
					aria-label='Hide Host Card'
					checked={selectedOption === 'hide'}
					onChange={handleChange}
					className='size-3 rounded-full appearance-none outline outline-2 outline-offset-2 outline-gray-400 checked:bg-rose-600 checked:outline-rose-500 mr-3'
				/>
				Hide
			</label>
		</fieldset>
	)
}
