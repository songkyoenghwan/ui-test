<script lang="ts">
	import SubHeading from '$lib/components/heading/SubHeading.svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	const { tit = '', txt = '', lists = [] } = $props();
</script>

<section data-scroll="slide-up" class="space-y-5 py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading {tit} {txt} />
	<ul class="space-y-5 lg:space-y-7.5">
		{#each lists as item, i (item.id)}
			{@const chk = item.checked}

			<li data-scroll="slide-up" animate:flip={{ delay: 500 }} class="rounded-xl bg-white">
				<dl class="text-2md divide-d9d9d9 group/faq flex flex-col divide-y divide-dashed lg:text-2xl">
					<dt class="flex">
						<label
							for={item.id}
							class="group flex flex-1 items-center justify-between gap-2.5 p-5 font-bold lg:gap-7.5 lg:p-7.5"
							aria-expanded={chk ? 'true' : 'false'}
						>
							<input type="checkbox" id={item.id} name={item.id} bind:checked={item.checked} class="sr-only" />
							<p class="flex items-center gap-2.5 lg:gap-7.5">
								<span class="text-primary text-2md flex-none lg:text-4xl">Q</span>
								<strong>{item.tit}</strong>
							</p>
							<icon-list
								name="faq_arr"
								class="group-has-checked/faq:fill-primary group-hover:fill-primary/80 relative ml-auto size-6.25 flex-none fill-black transition-all group-has-checked/faq:-rotate-180 lg:size-8.5"
							></icon-list>
						</label>
					</dt>
					<dd
						class="text-666 @starting:opacity-0 relative hidden whitespace-pre-line opacity-0 transition-all transition-discrete duration-300 group-not-checked/faq:opacity-0 group-has-checked/faq:grid group-has-checked/faq:opacity-100"
						transition:slide={{ duration: 50, easing: cubicOut }}
					>
						{#if chk}
							<div in:fly={{ y: 15, duration: 400, delay: 100 }} out:fade={{ duration: 150 }} class="space-y-5 py-5 pr-5 pl-10.5 lg:p-7.5 lg:px-22">
								<p>
									{item.txt}
								</p>

								{#if item.link}
									<div class="flex">
										<a
											href={item.link}
											class="hover:text-3743ff group flex min-h-12 flex-1 items-center justify-between gap-2 rounded-md border border-black px-5 transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:flex-none"
											aria-label={item.btn}
										>
											<span>{item.btn}</span>
											<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-black"></icon-list>
										</a>
									</div>
								{/if}
							</div>
						{:else}
							<p class="sr-only">{item.txt}</p>
						{/if}
					</dd>
				</dl>
			</li>
		{/each}
	</ul>
</section>
