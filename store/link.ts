import { defineStore } from 'pinia'
import { useAuthStore } from '~/store/auth'

const config = useRuntimeConfig()

const baseUrl = config.public.API as string

const authorization = { authorization: `Bearer ${useAuthStore().token}` }

export const useLinkStore = defineStore('link', function () {
	async function getUserLinks() {
		const { data, error } = await useFetch('/auth/me', {
			baseURL: baseUrl,
			method: 'GET',
			headers: authorization,
		})

		return { data, error }
	}

	async function createLink(url: string, domain: string) {
		const res = await useFetch('/link', {
			baseURL: baseUrl,
			method: 'POST',
			headers: authorization,
			body: { url: url, type: domain },
		})
		return res
	}

	return { getUserLinks, createLink }
})
