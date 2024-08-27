import CreateNewRoom from '@/components/CreateNewRoom'
import HostSettingsButton from '@/components/HostSettingsButton'
import ClearLocalStorageButton from '@/components/socketIoDevTools/ClearLocalStorageButton'

export default function Host() {
	return (
		<main className='px-16 py-10 w-full h-screen flex flex-col items-center relative'>
			<h1 className='text-3xl text-gray-300'>Scrum Diving Host</h1>
			<h2 className='text-2xl text-gray-300 py-4'>Create Room Page</h2>
			{/* <HostSettingsButton /> */}
			<CreateNewRoom />
			<ClearLocalStorageButton />
			<div className='w-36 absolute top-8 right-16 flex flex-col gap-4'>
				<HostSettingsButton />
			</div>
		</main>
	)
}
