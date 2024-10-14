import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Scrum Poker Under the Sea',
	description: "A tool for Scrum teams to estimate storypoints with a twist: it's under the sea!",
	icons: {
		icon: '/icon.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${inter.className} w-screen h-screen bg-gradient-to-t from-dkblue-800 to-dkblue-200`}
			>
				{children}
			</body>
		</html>
	)
}
