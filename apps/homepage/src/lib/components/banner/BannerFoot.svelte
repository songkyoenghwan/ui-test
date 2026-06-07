<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
</script>

<section data-section="floating" class="fixed bottom-5 z-2 px-5 whitespace-pre-line text-white max-md:w-full md:right-5">
	<div class="grid grid-cols-1 gap-2.5 rounded-xl bg-black/70 px-5 py-2.5 md:w-135.75 md:grid-cols-2 md:gap-5 lg:rounded-xl lg:p-5">
		<figure class="flex flex-none items-center gap-5 text-center text-white">
			<img src={`${__STATIC_URL__}/imgs/logo/logo-logi-only.svg`} alt="logi.fine" class="min-h-12" />
			<figcaption class="text-left font-bold">{m.floating_tit()}</figcaption>
		</figure>

		<div class="text-2sm whi grid grid-cols-2 gap-2.5 font-bold">
			<a
				href="/"
				class="hover:text-primary flex items-center gap-2.5 rounded-xl bg-white/20 px-2.5 hover:bg-white md:min-h-9"
				download="딥파인 회사소개서"
				title="새창열림"
				target="_blank"
			>
				<icon-list class="size-6 stroke-white" name="import"></icon-list>
				<span class="flex-none">{m.floating_btn_1()}</span>
			</a>
			<a href="/" class="hover:text-primary flex min-h-9 items-center gap-2.5 rounded-xl bg-white/20 px-2.5 hover:bg-white" title="새창열림" target="_blank">
				<icon-list class="size-6 stroke-white" name="arrow-link-underline"></icon-list>
				<span class="flex-none">{m.floating_btn_2()}</span>
			</a>
		</div>
	</div>
</section>
