module.exports = {
	apps: [
		{
			name: 'messytomini-app',
			port: 3010,
			exec_mode: 'cluster',
			instances: 3,
			script: './.output/server/index.mjs',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
}
