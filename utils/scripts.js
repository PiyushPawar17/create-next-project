const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const eslintConfig = require('../templates/eslintrc.template');
const prettierConfig = require('../templates/prettierrc.template');
const prettierIgnoreConfig = require('../templates/prettierignore.template');
const tsConfig = require('../templates/tsconfig.template');

class Scripts {
	#commands = [];
	#isUpdated = false;
	#flags = {};

	constructor(devDependencies, flags) {
		this.#flags = flags;

		/** Commands to run on every project */
		this.#commands.push('yarn create next-app . --typescript', `yarn add --dev ${devDependencies.join(' ')}`);

		if (flags.tailwind) {
			this.#commands.push('npx tailwindcss init -p');
		}
	}

	run() {
		const commandToRun = this.#commands.shift();

		const cmd = spawn('cmd', ['/s', '/c', commandToRun], {
			env: { FORCE_COLOR: 'true' },
			shell: true
		});

		cmd.stdout.on('data', function (data) {
			process.stdout.write(data);
		});

		cmd.stderr.on('data', function (data) {
			process.stderr.write(data);
		});

		cmd.on('exit', () => {
			if (this.#commands.length !== 0) {
				this.run();
			} else if (!this.#isUpdated) {
				this.#udpateConfig();
			}
		});
	}

	#udpateConfig() {
		/** Remove files */
		if (fs.existsSync(path.resolve(process.cwd(), '.eslintrc.json'))) {
			fs.unlinkSync(path.resolve(process.cwd(), '.eslintrc.json'));
		}
		fs.rmSync(path.resolve(process.cwd(), 'pages', 'api'), { recursive: true, force: true });
		fs.emptydirSync(path.resolve(process.cwd(), 'styles'));

		/** Update package.json to include prettier format script */
		const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
		packageJson.scripts.format = 'prettier --write **/*.{ts,tsx,js,json,scss}';

		/** Choose styles file extensions and template as per flags */
		const stylesFileName = this.#flags.sass ? 'global.scss' : 'global.css';
		const templateFile = this.#flags.tailwind ? 'global-tailwind.template.css' : 'global.template.css';

		/** Choose _app template as per flags */
		const appTemplateFile = this.#flags.sass ? '_app-scss.template.tsx' : '_app-css.template.tsx';

		/** Read non-js files */
		const globalStyles = fs.readFileSync(path.resolve(__dirname, '..', 'templates', templateFile), 'utf-8');
		const appTemplate = fs.readFileSync(path.resolve(__dirname, '..', 'templates', appTemplateFile), 'utf-8');
		const indexTemplate = fs.readFileSync(
			path.resolve(__dirname, '..', 'templates', 'index.template.tsx'),
			'utf-8'
		);

		/** Array of  files to be updated w.r.t. current location of the project */
		const filesToWrite = [
			{ path: ['.eslintrc'], data: eslintConfig, isJSON: true },
			{ path: ['.prettierrc'], data: prettierConfig, isJSON: true },
			{ path: ['.prettierignore'], data: prettierIgnoreConfig, isJSON: false },
			{ path: ['tsconfig.json'], data: tsConfig, isJSON: true },
			{ path: ['package.json'], data: packageJson, isJSON: true },
			{ path: ['styles', stylesFileName], data: globalStyles, isJSON: false },
			{ path: ['pages', '_app.tsx'], data: appTemplate, isJSON: false },
			{ path: ['pages', 'index.tsx'], data: indexTemplate, isJSON: false }
		];

		if (this.#flags.tailwind) {
			const tailwindConfig = fs.readFileSync(
				path.resolve(__dirname, '..', 'templates', 'tailwind-config.template.js'),
				'utf-8'
			);
			filesToWrite.push({ path: ['tailwind.config.js'], data: tailwindConfig, isJSON: false });
		}

		this.#writeFiles(filesToWrite);

		this.#isUpdated = true;

		this.#updateProject();
	}

	#writeFiles(files) {
		/** Write files to the specified path from the `filesToWrite` array */
		files.forEach(file => {
			const filePath = path.resolve(process.cwd(), ...file.path);

			fs.writeFileSync(filePath, file.isJSON ? JSON.stringify(file.data, null, '\t') : file.data);
		});
	}

	#updateProject() {
		/** Closing commands to finish the project setup */
		fs.rmSync(path.resolve(process.cwd(), '.git'), { recursive: true, force: true });

		this.#commands.push('yarn format', 'git init', 'git add .', 'git commit -m ":tada: feat: intial commit"');

		this.run();
	}
}

module.exports = Scripts;
