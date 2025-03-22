<template>
	<div
		class="w-screen h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-[#0c253b]"
	>
		<div class="max-w-[1200px] w-full h-full absolute">
			<div class="absolute bottom-0 right-0">
				<img src="/mirket-red.png" alt="mirket" class="" />
			</div>
		</div>

		<div
			class="max-w-6xl w-fit backdrop-blur-lg h-full justify-center flex flex-col gap-4 p-10 z-10 items-center rounded-3xl"
		>
			<img src="/logo.png" alt="logo" class="w-32 absolute top-0" />
			<div class="flex flex-col gap-2">
				<h1 class="text-2xl font-bold pl-2">Login Now to turn this 😵</h1>

				<div
					class="w-80 flex h-9 rounded-full gap-2 bg-emerald-100/20 items-center shadow-inner pl-2"
				>
					<img src="../assets/icons/icons8-search.svg" alt="search" />
					<span>https://www.google.com/searchq+hanging+on+a+rope&tbm=isch&v</span>
					<span class="rotate-12 origin-left">ed=2ahUKEwio55CcksyEAxVCq</span>
					<span class="origin-bottom-left translate-y-15 broken-piece"
						>_0HHZW7DUEQ2231sadf#asdf2afACERY</span
					>
				</div>
				<div class="flex">
					<h1 class="text-2xl font-bold w-fit pl-2">into&nbsp;</h1>
					<h1 class="text-2xl font-bold w-fit neon text-orange-500">this ⭐</h1>
				</div>
				<div class="w-80 flex gap-2 h-9 rounded-full items-center pl-2 bg-emerald-100/30">
					<img src="../assets/icons/icons8-search.svg" alt="search" class="" />
					<span>coolqr.io/ASDc2R</span>
				</div>
			</div>

			<form action="" class="flex flex-col w-[320px] gap-4 mt-5">
				<input v-model="payload.username" type="text" placeholder="username" required />

				<input
					v-model="payload.password"
					type="password"
					placeholder="Password"
					required
				/>
				<button
					type="submit"
					class="bg-orange-500 rounded-full p-2 text-white font-bold"
					@click="login"
					>Login</button
				>
			</form>

			<NuxtLink to="/signup">Don't have an account? Sign Up!</NuxtLink>
			<NuxtLink to="/">Continue without Signing Up</NuxtLink>
		</div>
	</div>
</template>

<script setup>
const config = useRuntimeConfig()

const payload = ref({ username: '', password: '' })

async function login() {
	const user = { username: payload.value.username, password: payload.value.password }

	useFetch('/auth/login', {
		baseURL: config.public.API,
		method: 'POST',
		body: user,
		onResponse: await navigateTo('/'),
	})
}
</script>

<style scoped>
input {
	border-radius: 1rem;
	padding: 0.25rem;
	padding-left: 1rem;
	background-color: rgba(215, 252, 240, 0.3);
	animation: example infinite 2s;
	color: white;
}

button {
	box-shadow: 0px 0px 13px 4px rgba(253, 152, 0, 0.253);
}

.broken-piece {
	transform: translateX(3rem) translateY(0.75rem);
	animation: hanging;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
}

@keyframes hanging {
	0% {
		rotate: 85deg;
	}
	50% {
		rotate: 95deg;
	}
	100% {
		rotate: 85deg;
	}
}
</style>
