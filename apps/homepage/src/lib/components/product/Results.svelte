<script lang="ts">
	import SubHeading from '$lib/components/heading/SubHeading.svelte';

	let { tit = '', txt = '', subTxt = '', lists = [], logo = '' } = $props();
</script>

<section data-scroll="slide-up" class="space-y-5 rounded-xl py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading {tit} {txt} {subTxt} />
	<ul
		class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 md:grid-cols-[repeat(auto-fit,minmax(calc(50%-20px),1fr))] xl:grid-cols-[repeat(auto-fit,minmax(calc(25%-20px),1fr))]"
	>
		<li class=" xl:7.5 grid place-content-between justify-between gap-5 rounded-xl p-5">
			<dl class="space-y-2.5 xl:space-y-5">
				<dt class="text-2xl font-bold xl:text-5xl">60%</dt>
				<dd class="text-lg xl:text-2xl">
					<p>Improved Operational Efficiency</p>

					<p>AR Work Guidance Impact in Shipbuilding</p>
				</dd>
			</dl>
		</li>
		<li class=" xl:7.5 grid place-content-between justify-between gap-5 rounded-xl p-5">
			<dl class="space-y-2.5 xl:space-y-5">
				<dt class="text-2xl font-bold xl:text-5xl">60%</dt>
				<dd class="text-lg xl:text-2xl">
					<p>Improved Operational Efficiency</p>

					<p>AR Work Guidance Impact in Shipbuilding</p>
				</dd>
			</dl>
		</li>
		<li class=" xl:7.5 grid place-content-between justify-between gap-5 rounded-xl p-5">
			<dl class="space-y-2.5 xl:space-y-5">
				<dt class="text-2xl font-bold xl:text-5xl">60%</dt>
				<dd class="text-lg xl:text-2xl">
					<p>Improved Operational Efficiency</p>

					<p>AR Work Guidance Impact in Shipbuilding</p>
				</dd>
			</dl>
		</li>
		<li class=" xl:7.5 grid place-content-between justify-between gap-5 rounded-xl p-5">
			<dl class="space-y-2.5 xl:space-y-5">
				<dt class="text-2xl font-bold xl:text-5xl">60%</dt>
				<dd class="text-lg xl:text-2xl">
					<p>Improved Operational Efficiency</p>

					<p>AR Work Guidance Impact in Shipbuilding</p>
				</dd>
			</dl>
		</li>
	</ul>
</section>
