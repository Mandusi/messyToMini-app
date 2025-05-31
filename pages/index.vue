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
				<div class="flex justify-center">
					<NuxtLink v-if="isLoggedIn" to="/me" class="p-3 text-xl text-[#931b1b]"
						>MY MINIS</NuxtLink
					>
					<NuxtLink v-else to="/signup" class="p-3 text-xl text-[#931b1b]"
						>SIGNUP</NuxtLink
					>
				</div>
				<Seperator />
				<img src="/logo.png" alt="logo" class="w-32" />
				<Seperator />
				<div class="flex justify-center">
					<NuxtLink
						v-if="isLoggedIn"
						to="/login"
						class="p-3 text-xl text-[#931b1b]"
						@click="useAuthStore().logout"
						>LOG OUT</NuxtLink
					>
					<NuxtLink v-else to="/login" class="p-3 text-xl text-[#931b1b]">LOGIN</NuxtLink>
				</div>
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
			<UrlShortener class="flex grow" />
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth'

const isLoggedIn = useAuthStore().isLoggedIn
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
