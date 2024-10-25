import Link from 'next/link'
import HostDemoButtons from '@/components/HostDemoButtons'
import type { ListenerRes } from '@/services/socket'

type HostToolsContainerProps = {
	allUsersPointsData: ListenerRes[]
	allowedStoryPoints: string[]
	updateUsersPoints: (points: ListenerRes[]) => void
	demoMode: boolean
	demoNumberUsers: number | undefined
	demoPointPercent: number | undefined
}

export default function HostToolsContainer({
	allUsersPointsData,
	allowedStoryPoints,
	updateUsersPoints,
	demoMode,
	demoNumberUsers,
	demoPointPercent,
}: HostToolsContainerProps) {
	return (
		<div className='absolute top-4 left-4 sm:left-12 flex flex-row flex-start items-center gap-8 scale-90'>
			<div className='tooltip tooltip-bottom text-xs' data-tip='Click to Create a New Room'>
				<Link href='/host' className='btn btn-outline-gray h-6 min-h-6 w-28 px-1 text-xs'>
					Create Room
				</Link>
			</div>
			{demoMode && (
				<HostDemoButtons
					allUsersPoints={allUsersPointsData}
					allowedStoryPoints={allowedStoryPoints}
					updateUsersPoints={updateUsersPoints}
					demoNumberUsers={demoNumberUsers}
					demoPointPercent={demoPointPercent}
				/>
			)}
		</div>
	)
}
