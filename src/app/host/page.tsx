import dynamic from 'next/dynamic'
// import CreateNewRoom from '@/components/CreateNewRoom'

const CreateNewRoom = dynamic(() => import('@/components/create-new-room/CreateNewRoom'), {
	ssr: false,
})

import ClearLocalStorageButton from '@/components/ClearLocalStorageButton'

export default function Host() {
	return (
		<div className='flex w-full min-h-screen h-full flex-col items-center justify-start gap-20 bg-gradient-to-t from-dkblue-800 to-dkblue-400'>
			<main className='px-6 py-20 sm:px-24 w-full h-screen flex flex-col items-center relative z-20 main-background'>
				<CreateNewRoom />
				<ClearLocalStorageButton />
			</main>
		</div>
	)
}
