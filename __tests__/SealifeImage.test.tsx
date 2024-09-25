import { render, screen } from '@testing-library/react'
import { SealifeImage } from '@/components/SealifeImage'

jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
}))

import { usePathname } from 'next/navigation'

describe('SealifeImage', () => {
	beforeEach(() => {
		;(usePathname as jest.Mock).mockReturnValue('/some/mock/path')
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('renders img element', () => {
		const imageNum = 1
		const { container } = render(<SealifeImage imageNum={imageNum} alt='Test image' />)

		const imgElement = container.querySelector('img')
		expect(imgElement).not.toBeNull()
		expect(imgElement).toBeInTheDocument()
	})

	test('renders image and alt text', () => {
		render(<SealifeImage imageNum={1} alt='Test image' />)

		const alt = screen.getByAltText(/Test/i)
		expect(alt).toBeInTheDocument()
	})
})
