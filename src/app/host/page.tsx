import CreateNewRoom from '@/components/CreateNewRoom'

import ClearLocalStorageButton from '@/components/socketIoDevTools/ClearLocalStorageButton'

export default function Host() {
	return (
		<main className='px-16 py-10 w-full h-screen flex flex-col items-center relative'>
			<CreateNewRoom />
			<ClearLocalStorageButton />
		</main>
	)
}
