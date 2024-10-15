import CreateNewRoom from '@/components/CreateNewRoom'
import Image from 'next/image'
import schoolFish from '/public/school-fish/school-fish-2000x1200-gradient-67-blur-1-fade-90.webp'

import ClearLocalStorageButton from '@/components/socketIoDevTools/ClearLocalStorageButton'

export default function Host() {
	return (
		<div className='flex w-full min-h-screen h-full flex-col items-center justify-start gap-20 bg-gradient-to-t from-dkblue-800 to-dkblue-400'>
			<div className='absolute top-[40vh] w-full h-full overflow-hidden  animate-fade-in-600'>
				<Image
					src={schoolFish}
					alt='school of fish'
					fill
					priority
					className='h-auto w-full'
					sizes='100vw'
					quality={100}
				/>
			</div>
			<main className='p-24 w-full h-screen flex flex-col items-center relative z-20  animate-fade-in-600'>
				<CreateNewRoom />
				<ClearLocalStorageButton />
			</main>
		</div>
	)
}
