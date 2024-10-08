import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

	it('show hide host buttons in the dom', () => {
		const option = 'hide'
		render(<RadioShowHide selectedOption={option} onChange={onChange} />)
		const showButton = screen.getByLabelText('Show')
		expect(showButton).toBeInTheDocument()

		const hideButton = screen.getByLabelText('Hide')
		expect(hideButton).toBeInTheDocument()
	})

	it('calls onChange when a input is clicked', async () => {
		const user = userEvent.setup()
		const option = 'hide'
		render(<RadioShowHide selectedOption={option} onChange={onChange} />)
		const showButton = screen.getByLabelText('Show')
		await user.click(showButton)
		expect(onChange).toHaveBeenCalled()
	})
})
