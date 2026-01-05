import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


export default {
	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			$src: 'src',
			$static: 'src/static',
			$routes: 'src/routes',
			$config: 'src/config'
		}
	},
	preprocess: vitePreprocess(),
	trailingSlash: 'always'
};

