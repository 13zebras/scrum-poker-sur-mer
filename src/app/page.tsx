import Link from 'next/link'

export default function Home() {
	return (
		<main className='flex w-full min-h-screen h-full flex-col items-center justify-start bg-gradient-to-t from-dkblue-800 to-dkblue-400 main-background'>
			<div className='relative flex flex-col items-center gap-6 sm:gap-8 px-10 sm:px-12 py-20 md:p-20 z-20 motion-safe:animate-fade-in-300'>
				<h1 className='text-4xl xs:text-5xl text-gray-200 text-center flex flex-row items-center justify-center flex-wrap gap-y-2 tracking-wide text-balance'>
					Scrum Poker sous la Mer
				</h1>
				<h3 className='text-lg md:text-xl text-center text-balance text-gray-100 tracking-wider mb-[4vh] sm:mb-[7vh]'>
					(Scrum Poker Under the Sea)
				</h3>
				<h2 className='px-8 xs:px-0 text-xl sm:text-2xl text-center text-balance text-gray-100 mb-[6vh] sm:mb-[12vh]'>
					A point planning game for Scrum teams
				</h2>

				<Link
					href='/host'
					className='btn btn-accent w-full max-w-80 text-2xl xs:text-2xl shadow-xl shadow-black/70 mb-2'
				>
					Host a Room
				</Link>
				<p className='text-balance text-center text-xl text-gray-200'>
					To host a room for your team, click the button above.
				</p>
			</div>
		</main>
	)
}
