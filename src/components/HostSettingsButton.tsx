import GearIcon from './icons/GearIcon'

export default function HostSettingsButton() {
	return (
		<div className='w-40 absolute top-10 right-12'>
			<button
				type='button'
				className='btn btn-outline-gray btn-sm w-full'
			>
				<GearIcon className='text-lg' />
				Host Settings
			</button>
		</div>
	)
}
