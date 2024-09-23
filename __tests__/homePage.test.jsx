import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Page', () => {
	test('Home page renders an h1', () => {
		render(<Home />)
		const heading = screen.getByRole('heading', { level: 1 })
		expect(heading).toBeInTheDocument()
	})
	test('Home page renders an h2', () => {
		render(<Home />)
		const heading = screen.getByRole('heading', { level: 2 })
		expect(heading).toBeInTheDocument()
	})
	test('Home page renders a link', () => {
		render(<Home />)
		const link = screen.getByRole('link')
		expect(link).toBeInTheDocument()
	})
})
