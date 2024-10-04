import { render, screen, fireEvent, userEvent } from '@testing-library/react'
import NewUserDialog from '@/components/NewUserDialog'
import type { RefObject } from 'react'

const mockRef: RefObject<HTMLDialogElement> = {
	current: {
		showModal: jest.fn(),
		close: jest.fn(),
	} as unknown as HTMLDialogElement,
}
// TODO: Add more tests for NewUserDialog
describe('NewUserDialog', () => {
	it('submit the form calls onSubmit prop', async () => {
		const handleOnSubmit = jest.fn()
		render(
			<NewUserDialog
				dialogRef={mockRef}
				handleOnSubmit={handleOnSubmit}
				displayError={false}
				open
			/>,
		)
		const input = screen.getByLabelText('your first name') as HTMLInputElement

		fireEvent.change(input, { target: { value: 'bob' } })
		expect(input.value).toBe('bob')
		const button = screen.getByRole('button', { name: 'Join Room' })
		fireEvent.click(button)
		expect(handleOnSubmit).toHaveBeenCalledWith('bob')

		// screen.debug();
	})

	it('renders display error', () => {
		const handleOnSubmit = jest.fn()
		render(
			<NewUserDialog
				dialogRef={mockRef}
				handleOnSubmit={handleOnSubmit}
				displayError={true}
				open
			/>,
		)
		const error = screen.getByText('Please enter your name!')
		expect(error).toBeInTheDocument()
	})
})
