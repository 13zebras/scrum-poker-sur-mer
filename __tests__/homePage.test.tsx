import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Page', () => {
	test('Home page renders properly', () => {
		render(<Home />)
		const heading1 = screen.getByRole('heading', { level: 1 })
		expect(heading1).toBeInTheDocument()

		const heading2 = screen.getByRole('heading', { level: 2 })
		expect(heading2).toBeInTheDocument()

		const link = screen.getByRole('link')
		expect(link).toBeInTheDocument()
	})
})
