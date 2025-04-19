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
					<span>Clicks: {{ link.views.length }}</span>
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
</template>

<script setup lang="ts">
import { useTimeAgo } from '@/composables/useTimeAgo'
const runtimeConfig = useRuntimeConfig()

const url = ref('')
const clickedLinkId = ref('')
const errorMessage = ref('')

interface LinkType {
	slug: string
	url: string
	id: string
	type: string
	createdAt: Date
	views: []
}

const props = defineProps({
	miniLinks: { type: Array<LinkType>, default: [] },
})

const emit = defineEmits(['updateLinks'])

async function shorten() {
	// Check whether the url is valid or not
	let validUrl
	try {
		validUrl = new URL(url.value)
	} catch (error) {
		errorMessage.value = 'Please enter a valid URL!'
		throw new Error('Not a valid URL')
	}

	const domain = validUrl.hostname

	const { data, error } = await useFetch('/link', {
		baseURL: runtimeConfig.public.API,
		method: 'POST',
		headers: {
			authorization: `Bearer ${props.token}`,
		},
		body: { url: url.value, type: domain },
	})

	emit('updateLinks')

	if (error.value) console.error(error.value.data)

	console.log(data.value)
}

function linkClickHandler(id: string, slug: string) {
	clickedLinkId.value = id
	navigator.clipboard.writeText(`${runtimeConfig.public.API}/link/${slug}`)
}

const getFavicon = (domain: string) =>
	`https://www.google.com/s2/favicons?sz=64&domain=${domain}`
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
</style>
