<template>
	<div class="flex gap-2 flex-col">
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
			<span>mini.mirket.dev/pretty</span>
		</div>
	</div>
</template>

<style scoped>
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
