<svelte:options
	customElement={{
		tag: 'not-found',
		shadow: 'none',
	}}
/>

<script>
	import { m } from '$lib/paraglide/messages.js';
</script>

<main class="error transition-color flex h-dvh w-dvw flex-col justify-between bg-linear-to-b from-[#3743ff] to-[#4589ff]">
	<section class="my-auto space-y-2.5 text-center text-white">
		<h1 class="sr-only">DEEP.FINE</h1>
		<h2 class="text-3xl font-bold lg:text-7xl">Page not found!</h2>
		<div class="space-y-5">
			<p class="text-lg lg:text-2xl">{m.not_found_txt()}</p>

			<div class="flex justify-center max-lg:px-5">
				<a
					href="https://www.deepfine.com/"
					aria-label={m.not_found_btn()}
					class="group flex min-h-12 items-center gap-2 rounded-md border border-white px-5 transition-colors hover:border-black hover:bg-black hover:text-white max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:flex-none"
				>
					<div class="flex size-6 stroke-white group-hover:stroke-white">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" class="rotate-180">
							<path
								d="M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697"
								fill="none"
								stroke-width="1.5"
								stroke-miterlimit="10"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
							<path d="M3.5 12H20.33" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</div>
					<span>{m.not_found_btn()}</span>
				</a>
			</div>
		</div>
	</section>
	<picture class="grid place-content-center">
		<img loading="lazy" src={`${__STATIC_URL__}/imgs/visual/img-404.png`} alt="404" class="w-full lg:w-135" />
	</picture>
</main>
