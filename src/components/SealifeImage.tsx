import Image from 'next/image'

type Props = {
	imageNum: number
	alt: string
}

const totalImages = 35

export function SealifeImage({ imageNum, alt }: Props) {
	imageNum = (imageNum % totalImages) + 1
	const paddedImageNum = imageNum.toString().padStart(3, '0')
	return (
		<Image
			src={`/sealife-images/sealife_256_${paddedImageNum}.webp`}
			alt={alt}
			width='256'
			height='256'
		/>
	)
}
