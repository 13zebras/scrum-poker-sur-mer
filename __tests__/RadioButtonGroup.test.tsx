import { render, screen } from '@testing-library/react'
import RadioButtonGroup from '@/components/RadioButtonGroup'

describe('RadioButtonGroup', () => {
	const onChange = jest.fn()
	test('RadioButtonGroup renders properly', () => {
		const option = 'hide'
		render(<RadioButtonGroup selectedOption={option} onChange={onChange} />)
		const showButton = screen.getByLabelText('Show')
		expect(showButton).toBeInTheDocument()

		const hideButton = screen.getByLabelText('Hide')
		expect(hideButton).toBeInTheDocument()
	})
})
