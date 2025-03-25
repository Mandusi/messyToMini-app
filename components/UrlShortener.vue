<template>
	<div class="flex-col flex items-center gap-3">
		<form
			class="flex flex-col w-[350px] justify-center gap-3 text-center"
			@submit.prevent="shorten"
		>
			<input v-model="url" type="text" placeholder="Paste the url here" />
			<button
				class="bg-[#FFD700] rounded-full shadow-inner text-[#512f16] shadow-orange-200 p-2 font-bold"
				@click="createAccount"
				>SHORTEN</button
			>
		</form>
		<div class="w-full flex justify-center rounded-2xl overflow-hidden">
			<table class="zigzag w-[350px]">
				<thead>
					<tr>
						<th>ShortURL</th>
						<th>Clicks</th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(slug, index) in slugs" :key="index" class="m-5">
						<td>{{ slug.slug }}</td>
						<td>{{ slug.clicks }}</td>
						<td>{{ slug.url }}</td>
					</tr>
					<tr>
						<td>youtube</td>
						<td>youtube</td>
						<td>youtube</td>
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
		slug: res.slug,
		clicks: 0,
	}

	slugs.value.push(short)
}

async function getAllLinks() {
	const { data } = await useFetch('/link/', {
		method: 'GET',
		baseURL: runtimeConfig.public.API,
	})
	const links = data.value.data
	links.forEach(link => {
		slugs.value.push({
			url: link.context.url,
			slug: link.slug,
			clicks: 0,
		})
	})
	console.log(links)
}

getAllLinks()
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
