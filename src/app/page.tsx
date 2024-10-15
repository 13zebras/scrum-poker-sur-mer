import Link from 'next/link'

export default function Home() {
	return (
		<main className='flex w-full min-h-screen h-full flex-col items-center justify-start bg-gradient-to-t from-dkblue-800 to-dkblue-400 main-background'>
			<div className='relative flex flex-col items-center gap-6 sm:gap-8 px-6 py-20 sm:p-24 z-20 animate-fade-in-500'>
				<h1 className='text-4xl sm:text-5xl text-gray-200 text-center flex flex-row items-center justify-center flex-wrap gap-y-2 tracking-wide'>
					<span className='px-2'>Scrum Poker</span>
					<span className='px-2'>sous la Mer</span>
				</h1>
				<h4 className='text-lg md:text-xl text-center text-gray-100 tracking-wider mb-[4vh] sm:mb-[7vh]'>
					(Scrum Poker Under the Sea)
				</h4>
				<h2 className='px-8 xs:px-0 text-xl sm:text-2xl text-center text-gray-100 mb-[6vh] sm:mb-[12vh]'>
					A point planning game for Scrum teams
				</h2>

				<Link
					href='/host'
					className='btn btn-accent w-full max-w-80 text-2xl xs:text-2xl shadow-xl shadow-black/70 mb-2'
				>
					Host a Room
				</Link>
				<div className='flex flex-col items-center text-xl text-gray-200'>
					<p>To host a room for your team,</p>
					<p>click the button above.</p>
				</div>
			</div>
		</main>
	)
}
