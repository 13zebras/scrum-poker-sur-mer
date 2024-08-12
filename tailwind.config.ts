import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./node_modules/daisyui/dist/**/*.js',
		'./node_modules/react-daisyui/dist/**/*.js',
	],
	theme: {
		extend: {
			keyframes: {},
			animation: {},
		},
	},
	plugins: [daisyui],
	// daisyUI config (these are the default values)
	daisyui: {
		themes: [
			'night',
			{
				dark: {
					...require('daisyui/src/theming/themes').dark,
					'base-100': '#00001b',
					'base-200': '#000014',
					'base-300': '#00010b',
					'.btn:disabled': {
						'--tw-bg-opacity': '0.4',
						'--tw-text-opacity': '0.4',
					},
				},
			},
			'halloween',
		],
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
}

export default config
