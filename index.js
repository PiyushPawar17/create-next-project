#!/usr/bin/env node

/**
 * create-next-project
 * Creates a Next.js project with my preferred configurations
 *
 * @author Piyush <https://piyushpawar.dev>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const Scripts = require('./utils/scripts');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const cnpCli = () => {
	init({ clear });

	if (input.includes(`help`)) {
		return cli.showHelp(0);
	}

	debug && log(flags);

	const devDependencies = ['@typescript-eslint/eslint-plugin', 'eslint-config-prettier', 'prettier'];

	if (flags.tailwind) {
		devDependencies.push('tailwindcss', 'postcss', 'autoprefixer');
	}

	if (flags.sass) {
		devDependencies.push('sass');
	}

	const scripts = new Scripts(devDependencies, flags);
	scripts.run();
};

cnpCli();
