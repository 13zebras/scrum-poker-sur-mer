import { render, screen } from '@testing-library/react'

import { SealifeImage } from '@/components/SealifeImage'

describe('SealifeImage', () => {
	it('picks the image from the start of the user id', () => {
		render(<SealifeImage userId='00000-user' alt='Test image' />)
		expect(screen.getByRole('img')).toHaveAttribute('src', '/sealife-images/sealife_256_001.webp')
	})

	it('wraps around the 33 images', () => {
		render(<SealifeImage userId='00026-user' alt='Test image' />)
		// 0x26 = 38, 38 % 33 + 1 = 6
		expect(screen.getByRole('img')).toHaveAttribute('src', '/sealife-images/sealife_256_006.webp')
	})

	it('renders the alt text', () => {
		render(<SealifeImage userId='00000-user' alt='Test image' />)
		expect(screen.getByAltText('Test image')).toBeInTheDocument()
	})
})
