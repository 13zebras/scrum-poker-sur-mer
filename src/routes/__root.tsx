import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import globalsCss from '@/styles/globals.css?url'

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'Scrum Poker Under the Sea' },
			{
				name: 'description',
				content: "A tool for Scrum teams to estimate storypoints with a twist: it's under the sea!",
			},
		],
		links: [
			{ rel: 'stylesheet', href: globalsCss },
			{ rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
		],
	}),
	component: RootDocument,
})

function RootDocument() {
	return (
		<html lang='en'>
			<head>
				<HeadContent />
			</head>
			<body className='w-full h-screen bg-gradient-to-t from-dkblue-800 to-dkblue-200'>
				<Outlet />
				<Scripts />
			</body>
		</html>
	)
}
