import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })


export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook('page:start', () => {
		NProgress.start()
	})

	nuxtApp.hook('page:finish', () => {
		NProgress.done()
	})
})
