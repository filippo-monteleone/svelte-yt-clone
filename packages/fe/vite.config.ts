import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode, command }) => {
	console.log('CURRENT COMMNAND', command);
	console.log('CURRENT MODE', mode);
	return {
		resolve: {
			alias: {
				'@project/ui': path.resolve('../ui/src'),
				$components: path.resolve('./src/components'),
				$services: path.resolve('./src/services'),
			},
		},
		plugins: [sveltekit()],
	};
});
