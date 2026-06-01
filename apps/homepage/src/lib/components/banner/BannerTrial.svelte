<script>
	import { m } from '$lib/paraglide/messages.js';
</script>

<section
	data-scroll="slide-up"
	class="bg-light-blue relative mt-5 grid min-h-80 grid-cols-1 justify-between overflow-clip rounded-xl bg-(image:--bg-trial) bg-cover bg-center bg-no-repeat px-7.5 lg:mt-7.5 lg:h-80 lg:grid-cols-[1fr_fit-content(640px)] lg:grid-rows-2 lg:px-15"
	style:--bg-trial={`url(${__STATIC_URL__}/imgs/banner/bg-trial.png)`}
>
	<picture class="absolute top-0 left-0 z-1 grid place-items-center">
		<img loading="lazy" src={`${__STATIC_URL__}/imgs/banner/img-new.png`} alt="new" class="h-14 lg:h-20" />
	</picture>

	<div data-scroll="slide-up" class="flex flex-1 flex-col justify-between lg:row-span-1">
		<div class="space-y-2.5 py-7.5 lg:py-15">
			<h4 class="text-lg font-bold lg:text-4xl">{m.main_title_trial?.()}</h4>
			<p>{m.main_subtitle_trial?.()}</p>
		</div>
	</div>

	<div data-scroll="slide-left" class="flex justify-center lg:order-2 lg:row-span-2">
		<picture class="grid place-items-center">
			<img loading="lazy" src={`${__STATIC_URL__}/imgs/banner/img-glass.png`} alt="img" class="-mt-5 h-3/4 lg:h-auto" />
		</picture>
		<picture class="-ml-25 grid place-items-center pt-2 lg:-ml-17">
			<img loading="lazy" src={`${__STATIC_URL__}/imgs/banner/img-barcode.png`} alt="img" class="h-2/3 lg:h-auto" />
		</picture>
	</div>

	<div class="flex w-full py-5 lg:order-3 lg:row-span-1 lg:inline-flex lg:py-15">
		<a
			href="/"
			class="hover:text-3743ff group flex h-12 flex-1 items-center justify-between gap-2 rounded-md border border-black px-5 transition-colors hover:bg-white max-lg:justify-between lg:mt-auto lg:min-h-13.5 lg:w-auto lg:flex-none"
			aria-label={m.btn_start_trial?.() + 'page'}
		>
			<span>{m.btn_start_trial?.()}</span>
			<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-black"></icon-list>
		</a>
	</div>
</section>
