<script lang="ts">
	import { ParaglideMessage } from '@inlang/paraglide-js-svelte';
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
				<dl class="text-2md divide-d9d9d9 group/faq flex flex-col divide-dashed has-checked:divide-y lg:text-2xl">
					<dt class="flex">
						<label
							for={item.id}
							class="group flex flex-1 items-center justify-between gap-2.5 p-5 font-bold lg:gap-7.5 lg:p-7.5"
							aria-expanded={chk ? 'true' : 'false'}
						>
							<input type="checkbox" id={item.id} name={item.id} bind:checked={item.checked} class="sr-only" />
							<p class="flex items-center gap-2.5 lg:gap-7.5">
								<span class="text-primary text-2md flex-none font-bold lg:text-4xl">Q</span>
								<strong class="font-bold">{item.tit}</strong>
							</p>
							<icon-list
								name="faq_arr"
								class="group-has-checked/faq:fill-primary group-hover:fill-primary relative ml-auto size-6.25 flex-none fill-black transition-all group-has-checked/faq:-rotate-180 lg:size-8.5"
							></icon-list>
						</label>
					</dt>
					<dd
						class="text-666 @starting:opacity-0 relative hidden whitespace-pre-line opacity-0 transition-all transition-discrete duration-300 group-not-checked/faq:opacity-0 group-has-checked/faq:grid group-has-checked/faq:opacity-100"
					>
						{#if chk}
							<div in:fly={{ y: 15, duration: 400, delay: 100 }} out:fade={{ duration: 150 }} class="py-5 pr-5 pl-10.5 lg:p-7.5 lg:px-22">
								<ParaglideMessage message={item.txt}>
									{#snippet b({ children })}
										<p class="pl-4 -indent-4">{@render children?.()}</p>
									{/snippet}
								</ParaglideMessage>

								{#if item.link}
									<div class="mt-5 flex lg:mt-7.5">
										<a
											href={item.link}
											class="group flex min-h-12 flex-1 items-center justify-between gap-2 rounded-md border border-black px-5 transition-colors hover:bg-black hover:text-white max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:flex-none"
											aria-label={item.btn}
											target={item.target ?? undefined}
											rel={item.target ? 'noopener noreferrer' : undefined}
										>
											<span>{item.btn}</span>
											<icon-list name="arrow-right" class="size-6 stroke-black group-hover:stroke-white"></icon-list>
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
