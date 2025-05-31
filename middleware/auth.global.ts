import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to: any) => {
	const target = to.path
	if (target === '/login' && useAuthStore().isLoggedIn) {
		return navigateTo('/')
	}

	if (target === '/me' && !useAuthStore().isLoggedIn) {
		return navigateTo('/')
	}
})
