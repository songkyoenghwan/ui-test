<script lang="ts">
	import SubHeading from '$lib/components/heading/SubHeading.svelte';

	const { tit = '', txt = '', list = [] } = $props();
</script>

<section data-scroll="slide-up" class="space-y-5 py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading {tit} {txt} />
	<ul>
		<li class="rounded-xl bg-white">
			<dl class="text-2md divide-d9d9d9 group/faq flex flex-col divide-y divide-dashed lg:text-2xl">
				<dt class="flex">
					<label for="c" class="flex flex-1 items-center justify-between gap-5 p-5 font-bold lg:gap-7.5 lg:p-7.5">
						<input type="checkbox" id="c" name="c" class="sr-only" />
						<p class="flex items-center gap-5 lg:gap-7.5">
							<span class="text-primary">Q</span>
							<strong>DAO는 어떤 디바이스를 지원하나요?</strong>
						</p>
						<icon-list
							name="faq_arr"
							class="group-has-checked/faq:fill-primary relative ml-auto size-6.25 fill-black transition-all group-has-checked/faq:-rotate-180 lg:size-8.5"
						></icon-list>
					</label>
				</dt>
				<dd
					class="text-666 @starting:opacity-0 relative hidden p-5 opacity-0 transition-all transition-discrete duration-300 group-not-checked/faq:opacity-0 group-has-checked/faq:grid group-has-checked/faq:opacity-100 lg:p-7.5"
				>
					We support a wide range of MR/AR smart glasses, including both monocular and binocular devices. You can choose the most suitable device based on your field
					environment and operational needs. Before deployment, we provide on-site consulting to recommend the optimal device configuration.
				</dd>
			</dl>
		</li>
	</ul>
</section>
