import eslint from 'vite-plugin-eslint'
import envdev from './env.dev'
import envprod from './env.prod'

export default defineNuxtConfig({
	app: {
		head: {
			title: 'Messy to Mini',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					hid: 'description',
					name: 'description',
					content: '',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo-min.svg' }],
		},
	},

	build: {
		transpile: ['primevue', '@vuepic/vue-datepicker'],
	},

	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],

	// Component auto import
	components: [
		{
			path: '~/components',
			pathPrefix: false,
			extensions: ['.vue'],
			global: true,
		},
	],

	ssr: false,

	runtimeConfig: {
		public: process.env.NODE_ENV === 'development' ? { ...envdev } : { ...envprod },
	},

	devServer: {
		port: 3010,
	},

	typescript: {
		tsConfig: {
			compilerOptions: {
				declaration: true,
				declarationDir: 'types',
			},
			include: ['~/types'],
		},
	},

	vite: {
		plugins: [eslint()],
	},

	tailwindcss: {
		cssPath: '~/assets/css/style.css',
		configPath: 'tailwind.config.js',
		injectPosition: 'first',
	},
})
