import Image from 'next/image'

type Props = {
	userId: string
	alt: string
}

const totalImages = 33

export function SealifeImage({ userId, alt }: Props) {
	// NOTE imageOffset adds a bit of randomness based on the first
	// character of the roomId which is the long string in the pathName.
	// Each time a new room is created, the imageOffset changes
	// Users are more likely to get a different image each time they play

	const newImageNum = (Number.parseInt(userId.slice(0, 5), 16) % totalImages) + 1

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
