<template>
	<div class="flex-col flex items-center gap-3">
		<form
			class="flex flex-col w-[350px] justify-center gap-3 text-center"
			@submit.prevent="shorten"
		>
			<input v-model="url" type="text" placeholder="Paste the url here" />
			<button
				class="bg-[#FFD700] rounded-full shadow-inner text-[#512f16] shadow-orange-200 p-2 font-bold"
				@click="shorten"
				>SHORTEN</button
			>
			<div v-if="errorMessage" class="text-red-800"> {{ errorMessage }}</div>
		</form>
		<div class="flex overflow-auto relative h-[390px]">
			<div class="end-gradiant fixed h-32 w-full bottom-0"></div>
			<div class="flex flex-col gap-3">
				<div
					v-for="link in miniLinks"
					:key="link.id"
					class="flex items-center justify-between gap-6 rounded-2xl p-2 bg-[#e5ece9] w-[350px]"
					@click="linkClickHandler(link.id, link.slug)"
				>
					<div class="h-10 w-10"><img :src="getFavicon(link.type)" class="w-10" /></div>
					<div class="flex flex-col grow">
						<div class="">
							<span>mini.mirket.dev/{{ link.slug }}</span>
						</div>
						<div class="text-slate-500 flex justify-between text-sm">
							<span>{{ useTimeAgo(new Date(link.createdAt)) }}</span>
							<span>Clicks: {{ link.views?.length || 'Log in' }}</span>
						</div>
					</div>
					<div class="h-8 w-8">
						<img v-if="clickedLinkId !== link.id" src="/copy.svg" alt="copy-icon" />
						<img
							v-show="clickedLinkId === link.id"
							src="/copy-success.svg"
							alt="copied-icon"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useTimeAgo } from '@/composables/useTimeAgo'
import { useAuthStore } from '~/store/auth'
const config = useRuntimeConfig()

const url = ref('')
const clickedLinkId = ref('')
const errorMessage = ref('')
const miniLinks = ref([])
const isLoggedIn = useAuthStore().isLoggedIn

async function authorize() {
	if (isLoggedIn) await getUserLinks()
	else {
		const { data, error } = await useFetch('/auth/refresh-token', {
			baseURL: config.public.API,
			method: 'GET',
			credentials: 'include',
		})

		if (error.value?.message) {
			console.log('error:')
			console.dir(error)
		}
		if (data.value) {
			console.log('data:')
			console.dir(data.value)
		}
	}
}

authorize()

async function shorten() {
	// Check whether the url is valid or not
	const validUrl = urlValidation(url.value)

	const domain = validUrl.hostname

	if (!isLoggedIn) {
		const miniLink = await guestCreateLink(domain)
		miniLinks.value.push(miniLink.data.value.data)
	} else {
		await createLink(domain)
		getUserLinks()
	}
}

async function createLink(domain) {
	const res = await useFetch('/link', {
		baseURL: config.public.API,
		method: 'POST',
		headers: {
			authorization: `Bearer ${useAuthStore().token}`,
		},
		body: { url: url.value, type: domain },
	})
	return res
}

async function guestCreateLink(domain) {
	const res = await useFetch('/link/guest', {
		baseURL: config.public.API,
		method: 'POST',
		body: { url: url.value, type: domain },
	})
	console.log(res)
	return res
}

async function getUserLinks() {
	const { data, error } = await useFetch('/auth/me', {
		baseURL: config.public.API,
		method: 'GET',
		headers: {
			authorization: `Bearer ${useAuthStore().token}`,
		},
	})
	if (data.value?.data) miniLinks.value = (data?.value).data
	if (error.value?.data) console.log(error.value?.data)
}

function urlValidation(url) {
	let validUrl
	try {
		validUrl = new URL(url)
	} catch (error) {
		errorMessage.value = 'Please enter a valid URL!'
		throw new Error('Not a valid URL')
	}
	return validUrl
}

function linkClickHandler(id, slug) {
	clickedLinkId.value = id
	navigator.clipboard.writeText(`${runtimeConfig.public.API}/link/${slug}`)
}

const getFavicon = domain => `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
</script>

<style scoped>
input {
	height: 36px;
	border-radius: 1rem;
	padding: 0.25rem;
	padding-left: 1rem;
	animation: example infinite 2s;
	outline-color: chocolate;
	background-color: #e5ece9;
}

h1 {
	color: #c00;
	font-family: sans-serif;
	font-size: 2em;
	margin-bottom: 0;
}

table {
	th,
	td {
		padding: 0.25em 0.5em;
		text-align: left;
		&:nth-child(2) {
			text-align: center;
		}
	}
	td {
		background-color: #eee;
	}
	th {
		background-color: rgb(122, 46, 14);
		color: #fff;
		padding: 0.5em;
	}
}

.end-gradiant {
	background: #eab522;
	background: linear-gradient(
		0deg,
		rgba(234, 181, 34, 1) 19%,
		rgba(234, 181, 34, 0) 100%
	);
}
</style>
