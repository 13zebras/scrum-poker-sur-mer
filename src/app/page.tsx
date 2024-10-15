import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
	return (
		<main className='flex w-full min-h-screen h-full flex-col items-center justify-start bg-gradient-to-t from-dkblue-800 to-dkblue-400'>
			<div className='absolute top-[40vh] w-full h-full overflow-hidden opacity-100'>
				<Image
					src='/school-fish/school-fish-2000x1200-gradient-67-blur-1-fade-90.webp'
					alt='background image of a school of fish'
					width={2000}
					height={1200}
					priority
					className='h-auto w-full animate-fade-in-1000'
					sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1560px) 100vw, 100vw'
					quality={90}
					placeholder='blur'
					blurDataURL='/school-fish/school-fish-2000x1200-blur.webp'
				/>
			</div>

			<div className='relative flex flex-col items-center gap-8 py-24 z-20'>
				<h1 className='text-6xl text-gray-100 font-semibold tracking-wider'>
					Scrum Poker sous la Mer
				</h1>
				<h4 className='text-xl text-gray-100 tracking-wider mb-[7vh]'>
					(Scrum Poker Under the Sea)
				</h4>
				<h2 className='text-3xl text-gray-100 mb-[12vh]'>A point planning game for Scrum teams</h2>

				<Link href='/host' className='btn btn-accent w-80 text-2xl shadow-xl shadow-black/70 mb-2'>
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
