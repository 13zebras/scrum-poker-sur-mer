import Link from 'next/link'
import RightArrowIcon from '@/components/icons/RightArrowIcon'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-start p-32 gap-8'>
			<h1 className='text-6xl text-sky-500 font-semibold tracking-wider'>
				Scrum Diving
			</h1>
			<h2 className='text-2xl text-gray-300 py-4'>
				Because it's not really poker
			</h2>

			<Link href='/host' className='btn btn-accent w-64 text-lg'>
				Host a Room
				<RightArrowIcon className='h-7 w-7 inline' />
			</Link>
		</main>
	)
}
