import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			//// default options are shown. On some platforms
			//// these options are set automatically — see below
			//pages: 'build',
			//assets: 'build',
			fallback: 'fallback.html',
			//precompress: false,
			//strict: true
		}),
		paths: { base: process.env.NODE_ENV === 'production' ? '/vrpt14s.github.io' : '' },
	}
};

export default config;
