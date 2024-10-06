import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewUserDialog from '@/components/NewUserDialog'
import type { RefObject } from 'react'

const mockRef: RefObject<HTMLDialogElement> = {
	current: {
		showModal: jest.fn(),
		close: jest.fn(),
	} as unknown as HTMLDialogElement,
}

describe('NewUserDialog', () => {
	it('submit the form calls onSubmit prop', async () => {
		const user = userEvent.setup()
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

		await user.type(input, 'bob')
		expect(input.value).toBe('bob')

		const form = screen.getByRole('form')
		fireEvent.submit(form)

		expect(handleOnSubmit).toHaveBeenCalledWith('bob')
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
