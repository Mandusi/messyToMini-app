<template>
	<div class="flex flex-col items-center bg-[#eab522] h-screen">
		<div class="absolute w-full h-full max-w-[1200px]">
			<div class="absolute bottom-0 left-0 hidden md:block">
				<img src="/mirket-yellow.png" alt="mirket" />
			</div>
		</div>
		<div class="flex flex-col gap-3 items-center z-10">
			<div class="flex items-center">
				<Seperator />
				<NuxtLink to="/signup" class="p-3 text-xl text-[#931b1b]">SIGNUP</NuxtLink>
				<Seperator />
				<img src="/logo.png" alt="logo" class="w-32" />
				<Seperator />
				<NuxtLink to="/login" class="p-3 text-xl text-[#931b1b]">LOGIN</NuxtLink>
				<Seperator />
			</div>
			<div class="flex flex-col items-center">
				<h1 class="font-bangers text-3xl text-warning-900"
					>Shorten. Share. Track. Instantly!</h1
				>
				<p class="w-96 md:w-full max-w-96 text-center">
					Enter a long URL, and we’ll generate a short, shareable link that you can keep
					track of clicks.
				</p>
			</div>
			<BrokenLink />
			<UrlShortener :mini-links="miniLinks" @update-links="getUserLinks" />
		</div>
	</div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const miniLinks = ref([])

const token = useState('token')

const isLoggedIn = Boolean(token.value)

console.log(isLoggedIn)

if (isLoggedIn) await getUserLinks()

async function getUserLinks() {
	const { data, error } = await useFetch('/auth/me', {
		baseURL: config.public.API,
		method: 'GET',
		headers: {
			authorization: `Bearer ${token.value}`,
		},
	})
	miniLinks.value = data?.value?.data
	if (error.value?.data) console.log(error.value?.data)
	console.log(data.value)
}
</script>
<style scoped>
.gradiant-bg {
	background: rgb(54, 57, 59);
	background: radial-gradient(
		circle,
		rgba(54, 57, 59, 0.9402354691876751) 0%,
		rgba(0, 0, 0, 1) 100%
	);
}
</style>
