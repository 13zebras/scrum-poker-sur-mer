import CreateNewRoom from '@/components/CreateNewRoom'
import Image from 'next/image'

import ClearLocalStorageButton from '@/components/socketIoDevTools/ClearLocalStorageButton'

export default function Host() {
	return (
		<div className='flex w-full min-h-screen h-full flex-col items-center justify-start gap-20 bg-gradient-to-t from-mdblue-900 to-mdblue-600'>
			<div className='absolute top-0 bg-dkblue-900 opacity-20 z-10 h-full w-full max-w-full overflow-hidden' />
			<div className='absolute top-0 w-full h-auto overflow-hidden opacity-90'>
				<Image
					src='/school-fish/school-fish-2000x1600-blue-fade-70.webp'
					alt='background image of a school of fish'
					width={2000}
					height={1600}
					priority
					className='h-full w-auto object-cover object-top'
					sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1560px) 100vw, 100vw'
					quality={100}
					placeholder='blur'
					blurDataURL='/school-fish/school-fish-1200-low.webp'
				/>
			</div>
			<main className='p-24 w-full h-screen flex flex-col items-center relative z-20'>
				<CreateNewRoom />
				<ClearLocalStorageButton />
			</main>
		</div>
	)
}
