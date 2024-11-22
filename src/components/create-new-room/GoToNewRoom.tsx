import Link from 'next/link'
import RightArrowIcon from '@/components/icons/RightArrowIcon'

type GoToNewRoomProps = {
	roomUrl: string
	hostRoomUrl: string
}

export default function GoToNewRoom({ roomUrl, hostRoomUrl }: GoToNewRoomProps) {
	return (
		<>
			<div className='w-full h-72 sm:h-80 flex flex-col items-center justify-start motion-safe:animate-fade-in-300'>
				<div
					className='w-full h-full flex flex-col items-center justify-end'
					style={{
						textShadow: '1px 1px 1px black, 2px 2px 1px black',
					}}
				>
					<h3 className='pb-6 sm:pb-8 font-bold text-gray-200 text-xl sm:text-3xl tracking-wide'>
						Your Room URL:
					</h3>
					<span className='text-gray-200 text-sm xs:text-lg sm:text-xl pb-8'>{roomUrl}</span>

					<span className='text-accent text-lg sm:text-[1.4rem] font-bold pb-2'>
						Room URL Copied to Clipboard!
					</span>
				</div>
			</div>

			<div className='w-full max-w-[20rem] xs:max-w-[22rem] motion-safe:animate-fade-in-300'>
				<Link
					href={hostRoomUrl}
					className='btn btn-secondary w-full h-11 min-h-11 text-lg xs:text-xl uppercase motion-safe:animate-fade-in-300 shadow-xl shadow-black/70'
					tabIndex={0}
				>
					Go to New Room
					<RightArrowIcon className='h-8 w-8 inline' />
				</Link>
			</div>
		</>
	)
}
