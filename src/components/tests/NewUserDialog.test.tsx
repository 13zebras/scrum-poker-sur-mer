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

const mockUser = 'Test User'
const mockUserId = '12345'
const mockIsRoomIdLastRoomId = true

// ... existing code ...

describe('NewUserDialog', () => {
	it('submit the form calls onSubmit prop', async () => {
		const user = userEvent.setup()
		const handleOnSubmit = jest.fn()
		render(
			<NewUserDialog
				dialogRef={mockRef}
				handleOnSubmit={handleOnSubmit}
				displayError={false}
				isDialogOpen={true}
				user={mockUser} // Add this line
				userId={mockUserId} // Add this line
				isRoomIdLastRoomId={mockIsRoomIdLastRoomId} // Add this line
				setIsDialogOpen={jest.fn()} // Add this line
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
				displayError={false}
				isDialogOpen={true}
				user={mockUser} // Add this line
				userId={mockUserId} // Add this line
				isRoomIdLastRoomId={mockIsRoomIdLastRoomId} // Add this line
				setIsDialogOpen={jest.fn()} // Add this line
			/>,
		)
		const error = screen.getByText('Please enter your name!')
		expect(error).toBeInTheDocument()
	})
})
