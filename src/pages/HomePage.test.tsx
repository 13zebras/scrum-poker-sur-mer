import HomePage from '@/pages/HomePage'
import {
	RouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRouter,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'

function renderWithRouter() {
	const router = createRouter({
		routeTree: createRootRoute({ component: HomePage }),
		history: createMemoryHistory(),
	})
	render(<RouterProvider router={router} />)
}

describe('HomePage', () => {
	it('renders properly', async () => {
		renderWithRouter()
		expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
		expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
		expect(screen.getByRole('link')).toHaveAttribute('href', '/host')
	})
})
