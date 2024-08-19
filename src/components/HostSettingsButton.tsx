import GearIcon from './icons/GearIcon'

export default function HostSettingsButton() {
	return (
		<button type='button' className='btn btn-outline-gray btn-sm w-full'>
			<GearIcon className='text-lg' />
			Host Settings
		</button>
	)
}
