import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'

import NewUserDialog from '@/components/NewUserDialog'
import { socketEmitter } from '@/services/socket'
import { POINT_CODES } from '@/utils/constants'

vi.mock('@/services/socket', () => ({ socketEmitter: vi.fn<typeof socketEmitter>() }))

type Props = ComponentProps<typeof NewUserDialog>

function renderDialog(
	props: { user?: string; userId?: string; isRoomIdLastRoomId?: boolean } = {},
) {
	const setUserData = vi.fn<Props['setUserData']>()
	render(
		<NewUserDialog
			dialogRef={{ current: null }}
			user={props.user ?? ''}
			userId={props.userId ?? ''}
			roomId='room-1'
			setUserData={setUserData}
			isRoomIdLastRoomId={props.isRoomIdLastRoomId ?? false}
			isDialogOpen={true}
			setIsDialogOpen={vi.fn<Props['setIsDialogOpen']>()}
		/>,
	)
	// The parent page opens the dialog the same way.
	const dialog = screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement
	dialog.showModal()
	return { setUserData }
}

function getJoinButton() {
	return screen.getByRole('button', { name: /join room/i })
}

describe('NewUserDialog', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('joins the room with the typed name', async () => {
		const user = userEvent.setup()
		const { setUserData } = renderDialog()

		await user.type(screen.getByLabelText('your first name', { selector: 'input' }), 'bob')
		await user.click(getJoinButton())

		expect(socketEmitter).toHaveBeenCalledWith(
			'join-room',
			expect.objectContaining({ roomId: 'room-1', message: POINT_CODES.JOIN, userName: 'bob' }),
		)
		expect(setUserData).toHaveBeenCalledWith(
			expect.objectContaining({ userName: 'bob', roomId: 'room-1' }),
		)
	})

	it('shows an error when the name is empty', async () => {
		const user = userEvent.setup()
		renderDialog()

		await user.click(getJoinButton())

		expect(screen.getByText('You forgot your first name!')).toBeInTheDocument()
		expect(socketEmitter).not.toHaveBeenCalled()
	})

	it('welcomes a returning user back', () => {
		renderDialog({ user: 'Alice', userId: 'abc', isRoomIdLastRoomId: true })

		expect(screen.getByText('Welcome back')).toBeInTheDocument()
		expect(screen.getByText('Alice!')).toBeInTheDocument()
	})
})
