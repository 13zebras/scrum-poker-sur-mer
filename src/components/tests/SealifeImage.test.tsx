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

	it('renders img with correct source number', () => {
		const imageNum = 1
		const { container } = render(<SealifeImage imageNum={imageNum} alt='Test image' />)

		const imgElement = container.querySelector('img')
		expect(imgElement!.src).toContain('sealife-images%2Fsealife_256_009.webp&w=640&q=75')
	})

	it('renders img with 2nd correct source number', () => {
		const imageNum = 5
		const { container } = render(<SealifeImage imageNum={imageNum} alt='Test image' />)

		const imgElement = container.querySelector('img')
		expect(imgElement!.src).toContain('sealife-images%2Fsealife_256_013.webp&w=640&q=75')
	})

	it('renders image and alt text', () => {
		render(<SealifeImage imageNum={1} alt='Test image' />)

		const alt = screen.getByAltText(/Test/i)
		expect(alt).toBeInTheDocument()
	})
})
