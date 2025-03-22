<template>
	<div class="flex-col flex items-center">
		<form
			class="flex flex-col w-[350px] justify-center gap-3 text-center"
			@submit.prevent="shorten"
		>
			<input v-model="url" type="text" placeholder="Paste the url here" />
			<button
				class="bg-[#FFD700] rounded-full shadow-inner shadow-orange-200 p-2 font-bold"
				@click="createAccount"
				>Shorten</button
			>
		</form>
		<div class="w-full flex justify-center">
			<table class="w-5/6 max-w-max m-10 zigzag">
				<thead>
					<tr>
						<th>URL</th>
						<th>ShortURL</th>
						<th>Clicks</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(slug, index) in slugs" :key="index" class="m-5">
						<td>{{ slug.url }}</td>
						<td>{{ slug.slug }}</td>
						<td>{{ slug.clicks }}</td>
					</tr>
					<tr>
						<td>youtube</td>
						<td>youtube</td>
						<td>youtube</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const url = ref('')
const slugs = ref([])
async function shorten() {
	const { data } = await useFetch(`/link`, {
		baseURL: runtimeConfig.public.API,
		method: 'POST',
		body: { url: url.value, type: 'url' },
	})
	const res = data.value.data

	const short = {
		url: res.context.url,
		slug: runtimeConfig.public.API + res.slug,
		clicks: 0,
	}

	slugs.value.push(short)
}

shorten()
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

h1 {
	color: #c00;
	font-family: sans-serif;
	font-size: 2em;
	margin-bottom: 0;
}

table {
	font-family: sans-serif;
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
		background-color: #009;
		color: #fff;
		padding: 0.5em;
	}
}
</style>
