import { render, screen } from '@testing-library/react'
import RadioShowHide from '@/components/RadioShowHide'

describe('RadioShowHide', () => {
	const onChange = jest.fn()
	it('renders properly', () => {
		const option = 'hide'
		render(<RadioShowHide selectedOption={option} onChange={onChange} />)
		const showButton = screen.getByLabelText('Show')
		expect(showButton).toBeInTheDocument()

		const hideButton = screen.getByLabelText('Hide')
		expect(hideButton).toBeInTheDocument()
	})

	it('calls onChange when a input is clicked', () => {
		const option = 'hide'
		render(<RadioShowHide selectedOption={option} onChange={onChange} />)
		const showButton = screen.getByLabelText('Show')
		expect(showButton).toBeInTheDocument()

		const hideButton = screen.getByLabelText('Hide')
		expect(hideButton).toBeInTheDocument()
	})

	it.todo('add test for asserting onChange function show/hide')
})
