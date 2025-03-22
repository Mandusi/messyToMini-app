<template>
	<div class="flex flex-col items-center bg-[#eab522] h-screen">
		<div class="absolute w-full h-full max-w-[1200px]">
			<div class="absolute bottom-0 left-0">
				<img src="/mirket-yellow.png" alt="mirket" />
			</div>
		</div>
		<div class="flex flex-col items-center z-10 backdrop-blur-md">
			<div class="flex items-center">
				<Seperator />
				<NuxtLink to="/signup" class="p-3 text-xl text-[#931b1b]">SIGNUP</NuxtLink>
				<Seperator />
				<img src="/logo.png" alt="logo" class="w-32" />
				<Seperator />
				<NuxtLink to="/login" class="p-3 text-xl text-[#931b1b]">LOGIN</NuxtLink>
				<Seperator />
			</div>
			<div class="p-5 flex flex-col items-center">
				<h1 class="font-bangers text-3xl text-warning-900"
					>Shorten. Share. Track. Instantly!</h1
				>
				<p class="w-96 md:w-full text-center">
					Enter a long URL, and we’ll instantly generate a short, shareable link. Track
					clicks, monitor performance, and manage all your links in one place.
				</p>
			</div>
			<BrokenLink />
			<UrlShortener class="mt-2" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>
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
