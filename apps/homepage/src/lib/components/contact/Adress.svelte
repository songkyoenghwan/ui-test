<svelte:options
	customElement={{
		tag: 'address-section',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { visualMotion } from '$lib/components/heading/HeadingMotion.svelte';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section
	class="rounded-xl bg-black bg-(image:--bg-mo) bg-cover bg-center p-5 text-white transition-all lg:bg-(image:--bg-pc) lg:p-15"
	style:--bg-mo={`url(${__STATIC_URL__}/imgs/visual/bg-addr-mo.png)`}
	style:--bg-pc={`url(${__STATIC_URL__}/imgs/visual/bg-addr-pc.png)`}
>
	<ul {@attach visualMotion} class="grid grid-cols-1 gap-7.5 lg:grid-cols-2">
		<li class="space-y-2">
			<p class="text-2md text-white/70 lg:text-lg">{m.company_address_tit?.()}</p>
			<address class="text-2md font-bold lg:text-lg">{m.company_address_txt?.()}</address>
		</li>
		<li class="space-y-2">
			<p class="text-2md text-white/70 lg:text-lg">{m.company_contact_tit?.()}</p>
			<a href="tel:{m.company_contact_txt?.()}" class="text-2md font-bold lg:text-lg">{m.company_contact_txt?.()}</a>
			<p class="text-2md text-white/70 lg:text-lg">{m.company_contact_ex?.()}</p>
		</li>
		<li class="space-y-2">
			<p class="text-2md text-white/70 lg:text-lg">{m.company_email_tit?.()}</p>
			<a href="mailto:{m.company_email_txt?.()}" class="text-2md font-bold lg:text-lg">{m.company_email_txt?.()}</a>
		</li>
		<li class="space-y-2">
			<p class="text-2md text-white/70 lg:text-lg">{m.company_fax_tit?.()}</p>
			<p class="text-2md font-bold lg:text-lg">{m.company_fax_txt?.()}</p>
		</li>
	</ul>
</section>
