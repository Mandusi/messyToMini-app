<template>
	<div class="flex flex-col items-center bg-[#eab522] h-screen">
		<div class="absolute w-full h-full max-w-[1200px]">
			<div class="absolute bottom-0 left-0 hidden md:block">
				<img src="/mirket-yellow.png" alt="mirket" />
			</div>
		</div>
		<div class="flex flex-col gap-3 items-center z-10 h-screen">
			<div class="flex items-center">
				<Seperator />
				<NuxtLink to="/" class="p-3 text-xl text-[#931b1b]">GO BACK</NuxtLink>
				<Seperator />
				<img src="/logo.png" alt="logo" class="w-32" />
				<Seperator />
				<NuxtLink
					to="/login"
					class="p-3 text-xl text-[#931b1b]"
					@click="useAuthStore().logout"
					>LOG OUT</NuxtLink
				>
				<Seperator />
			</div>

			<div class="flex flex-col gap-3 overflow-y-auto transition-all">
				<div
					v-for="link in miniLinks"
					:key="link.id"
					class="flex justify-center items-center gap-3"
				>
					<div
						class="flex group items-center justify-between gap-3 rounded-2xl p-2 bg-[#e5ece9] w-[370px] border border-slate-700"
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
							<div class="w-[240px]">
								<span>{{ link.url }}</span>
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
					<div class="group-hover:bg-red-500"
						><button class="h-5 w-5" @click="deleteHandler(link.id)"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								class="h-full w-full"
							>
								<path
									d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
								/>
							</svg> </button
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth'
const config = useRuntimeConfig()

const miniLinks = ref([])
const clickedLinkId = ref('')
const errorMessage = ref('')

async function getUserLinks() {
	const { data, error } = await useFetch('/auth/me', {
		baseURL: config.public.API,
		method: 'GET',
		headers: {
			authorization: `Bearer ${useAuthStore().token}`,
		},
	})
	if (data.value?.data) miniLinks.value = (data?.value).data
	if (error.value?.data) errorMessage.value = error.value?.data
}

async function deleteHandler(linkId) {
	const { data, error } = await useFetch(`/link/${linkId}`, {
		baseURL: config.public.API,
		method: 'DELETE',
		headers: {
			authorization: `Bearer ${useAuthStore().token}`,
		},
	})
	if (error.value?.data) errorMessage.value = error.value?.data
	if (data.value?.data) {
		console.log(data.value.data)
		getUserLinks()
	}
}

function linkClickHandler(id, slug) {
	clickedLinkId.value = id
	navigator.clipboard.writeText(`${config.public.API}/link/${slug}`)
}

function getFavicon(domain) {
	return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
}

getUserLinks()
</script>
