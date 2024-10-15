import Image from 'next/image'
import { usePathname } from 'next/navigation'

type Props = {
	imageNum: number
	alt: string
}

const totalImages = 33

export function SealifeImage({ imageNum, alt }: Props) {
	const pathName = usePathname()

	// NOTE imageOffset adds a bit of randomness based on the first
	// character of the roomId which is the long string in the pathName.
	// Each time a new room is created, the imageOffset changes
	// Users are more likely to get a different image each time they play

	const imageOffset = pathName.split('/').slice(-1)[0].charCodeAt(0)
	const newImageNum = ((imageNum + imageOffset) % totalImages) + 1

	const paddedImageNum = newImageNum.toString().padStart(3, '0')
	return (
		<Image
			src={`/sealife-images/sealife_256_${paddedImageNum}.webp`}
			alt={alt}
			width='256'
			height='256'
			priority
			quality={80}
		/>
	)
}
