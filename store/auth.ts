import { defineStore } from 'pinia'

interface User {
	id: string
	firstName: string
	lastName: string
	username: string
}

export const useAuthStore = defineStore(
	'auth',
	function () {
		const token = ref()
		const refreshToken = ref()
		const user = ref<User>()

		async function login(username: string, password: string) {
			const res = await useFetch('/auth/login', {
				baseURL: useRuntimeConfig().public.API as string,
				method: 'POST',
				body: { username, password },
			})

			if ((res.data.value as any).error) return (res.data.value as any).error

			const data = (res.data.value as any)?.data as any

			token.value = data.token
			refreshToken.value = data.refreshToken
			user.value = {
				firstName: data.firstName,
				lastName: data.lastName,
				id: data.id,
				username: data.username,
			}
		}

		function logout() {
			token.value = ''
			refreshToken.value = ''
			user.value = undefined
		}

		return {
			token,
			refreshToken,
			user,
			login,
			logout,
			isLoggedIn: computed(() => {
				return !!token.value
			}),
		}
	},
	{
		persist: {
			storage: localStorage,
			key: 'auth',
		},
	},
)
