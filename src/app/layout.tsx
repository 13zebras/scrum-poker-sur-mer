import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Scrum Diving',
	description: "It isn't really scrum poker, is it?",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${inter.className} w-screen h-screen bg-gradient-to-t from-dkblue-900 to-dkblue-400`}
			>
				<div className='w-full h-full max-w-[88rem] mx-auto'>
					{children}
				</div>
			</body>
		</html>
	)
}
