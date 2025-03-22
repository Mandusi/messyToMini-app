<template>
	<div class="w-screen h-screen flex flex-col items-center overflow-hidden bg-[#eab522]">
		<div class="max-w-[1200px] absolute bottom-0 left-0">
			<img src="/mirket-yellow.png" alt="mirket" class="" />
		</div>

		<h1 class="text-6xl p-10 text-[#1c1324]">
			<span class="text-7xl">Messy</span>
			to
			<span class="text-7xl">Mini</span>
		</h1>

		<div
			class="max-w-6xl w-fit z-10 backdrop-blur-md flex flex-col gap-4 p-10 h-full justify-center items-center"
		>
			<div class="flex flex-col items-center justify-center gap-4">
				<div class="w-[350PX]">
					<h1 class="text-4xl font-boogaloo text-center text-[#512f16] w-fit"
						>GET RID OF CROOKED L000OOOOO000NG LINKS!
					</h1>
				</div>
				<div
					class="w-[350px] flex h-9 rounded-full border-2 items-center bg-[#e5ece9] shadow-inner pl-2 text-slate-800"
				>
					<img src="../assets/icons/icons8-search.svg" alt="search" class="w-full" />
					<span>https://www.google.com/searchq+hanging+on+a+rope&tbm=isch&v</span>
					<span class="rotate-12 origin-left">ed=2ahUKEwio55CcksyEAxVCq</span>
					<span class="origin-bottom-left translate-y-15 broken-piece"
						>_0HHZW7DUEQ2231sadf#asdf2afACERY</span
					>
				</div>
				<div
					class="w-[350px] border-2 flex h-9 rounded-full bg-[#e5ece9] shadow-inner items-center pl-2 text-slate-800"
				>
					<div class="w-5">
						<img src="../assets/icons/icons8-search.svg" alt="search" />
					</div>
					<span>coolqr.io/ASDc2R</span>
				</div>
				<!-- <div class="flex justify-start w-full items-start">
					<h1 class="text-2xl font-boogaloo w-fit pl-2">into&nbsp;</h1>
					<h1 class="text-2xl font-boogaloo w-fit neon">this⭐</h1>
				</div> -->
			</div>

			<form action="" class="flex flex-col w-[350px] gap-4 mt-5">
				<div class="flex gap-2">
					<input
						v-model="payload.firstName"
						type="text"
						class="w-1/2"
						placeholder="First Name"
						required
					/>
					<input
						v-model="payload.lastName"
						type="text"
						class="w-1/2"
						placeholder="Last Name"
						required
					/>
				</div>
				<input v-model="payload.username" type="text" placeholder="username" required />
				<input
					v-model="payload.email"
					type="email"
					placeholder="example@mail.com"
					required
				/>
				<input v-model="payload.password" type="password" placeholder="Password" />
				<button
					class="bg-[#FFD700] rounded-full shadow-inner shadow-orange-200 p-2 font-bold"
					@click="createAccount"
					>Create Account</button
				>
			</form>
			<div class="flex text-[#512f16] flex-col justify-center items-center">
				<NuxtLink to="/login">Already have an account? Log In!</NuxtLink>
				<NuxtLink to="/">Later</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
const payload = ref({
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
})

const config = useRuntimeConfig()

async function createAccount() {
	const user = {
		username: payload.value.username,
		email: payload.value.email,
		firstName: payload.value.firstName,
		lastName: payload.value.lastName,
		password: payload.value.password,
	}

	useFetch('/auth/sign-up', {
		baseURL: config.public.API,
		method: 'POST',
		body: user,
	})

	await navigateTo('/login')
}
</script>

<style scoped>
input {
	border-radius: 1rem;
	padding: 0.25rem;
	padding-left: 1rem;
	animation: example infinite 2s;
	outline-color: chocolate;
	background-color: #e5ece9;
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

.neon {
	animation-name: glow;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
}

@keyframes glow {
	from {
		text-shadow:
			0px 0px 5px #7d67ff,
			0px 0px 5px #ffe600;
	}
	to {
		text-shadow:
			0px 0px 20px #f1ee04,
			0px 0px 20px #00cafc;
	}
}
</style>
