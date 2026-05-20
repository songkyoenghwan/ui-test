<svelte:options
	customElement={{
		tag: 'footer-section',
		shadow: 'none',
	}}
/>

<script lang="ts">
</script>

<footer data-scroll="slide-up" class="text-2md text-666 p-5 pb-5 lg:pb-7.5 lg:text-lg">
	<div class="relative rounded-xl bg-white lg:grid lg:grid-cols-2">
		<footer-adress class="flex flex-col gap-5 p-5 lg:p-7.5"></footer-adress>

		<section class="flex flex-col justify-between gap-15 p-5 lg:gap-5 lg:p-7.5">
			<ul class="grid grid-cols-2 gap-15 lg:grid-cols-4">
				<li class="grid gap-5">
					<h2 class="text-2md text-black lg:text-lg">Products</h2>
					<ul class="space-y-5">
						<li><a href="" class="underline-offset-4 hover:underline">Logi Grid</a></li>
						<li><a href="" class="underline-offset-4 hover:underline">DAO</a></li>
						<li><a href="" class="underline-offset-4 hover:underline">DSC</a></li>
					</ul>
				</li>
				<li class="grid">
					<h2 class="text-2md text-black lg:text-lg"><a href="/company" class="underline-offset-4 hover:underline">Company</a></h2>
				</li>
				<li class="grid">
					<h2 class="text-2md text-black lg:text-lg"><a href="/news/news" class="underline-offset-4 hover:underline">News</a></h2>
				</li>
				<li class="grid">
					<h2 class="text-2md text-black lg:text-lg"><a href="conatact" class="underline-offset-4 hover:underline">Conatact Sales</a></h2>
				</li>
			</ul>
			<footer-sns class="inline-flex w-full items-center justify-center gap-7.5 lg:justify-end"></footer-sns>
		</section>

		<section class="border-t-dashed border-t-d9d9d9 border-t p-5 text-center lg:col-span-2">
			<p>
				ⓒ {new Date().getUTCFullYear()}. DEEP.FINE Co., Ltd. All rights reserved.
			</p>
		</section>
	</div>
</footer>
