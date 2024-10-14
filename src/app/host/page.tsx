import CreateNewRoom from '@/components/CreateNewRoom'
import Image from 'next/image'

import ClearLocalStorageButton from '@/components/socketIoDevTools/ClearLocalStorageButton'

export default function Host() {
	return (
		<div className='flex w-full min-h-screen h-full flex-col items-center justify-start gap-20 bg-gradient-to-t from-dkblue-800 to-dkblue-400'>
			<div className='absolute top-[40vh] w-full h-full overflow-hidden'>
				<Image
					src='/school-fish/school-fish-2000x1200-gradient-67-blur-1-fade-90.webp'
					alt='background image of a school of fish'
					width={2000}
					height={1200}
					priority
					className='h-auto w-full animate-fade-in-500'
					sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1560px) 100vw, 100vw'
					quality={90}
				/>
			</div>
			<main className='p-24 w-full h-screen flex flex-col items-center relative z-20'>
				<CreateNewRoom />
				<ClearLocalStorageButton />
			</main>
		</div>
	)
}
