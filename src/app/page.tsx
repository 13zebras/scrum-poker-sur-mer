import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
	return (
		<main className='flex w-full min-h-screen h-full flex-col items-center justify-start gap-20 bg-gradient-to-t from-mdblue-800 to-mdblue-400'>
			<div className='absolute top-0 bg-dkblue-900 opacity-0 z-10 h-full w-full max-w-full overflow-hidden' />
			<div className='absolute top-0 w-full h-auto overflow-hidden opacity-90'>
				<Image
					src='/school-fish/school-fish-2000x1600-blue-fade-70.webp'
					alt='background image of a school of fish'
					width={2000}
					height={1600}
					priority
					className='h-full w-auto object-cover object-top'
					sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1560px) 100vw, 100vw'
					quality={100}
					placeholder='blur'
					blurDataURL='/school-fish/school-fish-1200-low.webp'
				/>
			</div>

			<div className='relative flex flex-col items-center gap-8 py-24 z-20'>
				<h1
					className='text-6xl text-gray-100 font-semibold tracking-wider'
					style={{
						textShadow: '-1px -1px 3px black, 3px 3px 3px black',
					}}
				>
					ScrumPoker sous La Mer
				</h1>
				<h4
					className='text-xl text-gray-100 tracking-wider mb-[7vh]'
					style={{
						textShadow: '-1px -1px 2px black, 2px 2px 2px black',
					}}
				>
					(Scrum Poker Under the Sea)
				</h4>
				<h2
					className='text-3xl text-gray-100 mb-[12vh]'
					style={{
						textShadow: '-1px -1px 2px black, 3px 3px 3px black',
					}}
				>
					A point planning game for Scrum teams
				</h2>

				<Link href='/host' className='btn btn-accent w-80 text-2xl shadow-xl shadow-black/70 mb-2'>
					Host a Room
				</Link>
				<div
					className='flex flex-col items-center text-xl text-gray-200'
					style={{
						textShadow: '-1px -1px 2px black, 2px 2px 2px black',
					}}
				>
					<p>To host a room for your team,</p>
					<p>click the button above.</p>
				</div>
			</div>
		</main>
	)
}
