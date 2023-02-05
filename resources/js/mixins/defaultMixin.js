export default {
	mounted() {
		// console.log('default mixin mounted')
	},
	methods: {
		translate(string) {
			return window.i18n.trans(string);
		},
	},
}