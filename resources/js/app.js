import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { I18n, getActiveLanguage, isLoaded } from 'laravel-vue-i18n'
import defaultMixin from './mixins/defaultMixin'

window.addEventListener("load", async function () {

	window.activeLang = getActiveLanguage();
	window.resolver = async lang => {
		const langs = import.meta.glob('../../lang/*.json');
		return await langs[`../../lang/${lang}.json`]();
	}
	const i18n = new I18n({
		lang: window.activeLang,
		resolve: await window.resolver
	})
	// console.log({ i18n })
	window.i18n = i18n;

	const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

	createInertiaApp({
		title: (title) => `${title} - ${appName}`,
		resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
		setup({ el, App, props, plugin }) {
			return createApp({ render: () => h(App, props) })
				.use(plugin)
				.mixin(defaultMixin)
				.use(ZiggyVue, Ziggy)
				.mount(el);
		},
		progress: {
			color: '#4B5563',
		},
	});
})