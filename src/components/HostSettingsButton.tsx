import GearIcon from './icons/GearIcon'

export default function HostSettingsButton() {
	return (
		<button type='button' className='btn btn-outline-gray btn-xs w-full'>
			<GearIcon className='text-sm' />
			Settings
		</button>
	)
}
