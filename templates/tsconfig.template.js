module.exports = {
	compilerOptions: {
		target: 'es5',
		lib: ['dom', 'dom.iterable', 'esnext'],
		allowJs: true,
		skipLibCheck: true,
		strict: true,
		forceConsistentCasingInFileNames: true,
		noEmit: true,
		esModuleInterop: true,
		module: 'esnext',
		moduleResolution: 'node',
		resolveJsonModule: true,
		isolatedModules: true,
		jsx: 'preserve',
		noImplicitAny: true,
		allowSyntheticDefaultImports: true,
		baseUrl: '.',
		paths: {
			'@components/*': ['./components/*'],
			'@styles/*': ['./styles/*']
		},
		incremental: true
	},
	include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
	exclude: ['node_modules']
};
