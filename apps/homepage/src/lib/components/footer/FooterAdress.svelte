<svelte:options
	customElement={{
		tag: 'footer-adress',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	import logo from '$lib/assets/imgs/logo/logo-deepfine.svg';
</script>

<section class="flex flex-col gap-5">
	<p><enhanced:img src={logo} alt="DEEP.FINE" class="w-35 lg:w-69.25" /></p>
	<div class="grid grid-cols-1">
		<p class="text-2md text-black lg:text-2xl">{m.company_address_tit?.()}</p>
		<address>{m.company_address_txt?.()}</address>
	</div>
	<ul class="grid grid-cols-1 gap-2 lg:pt-7.5">
		<li class="grid grid-cols-[72px_1fr]">
			<p class="text-2md text-black lg:text-lg">{m.company_contact_tit?.()}</p>
			<a href="tel:{m.company_contact_txt?.()}">{m.company_contact_txt?.()}</a>
		</li>
		<li class="grid grid-cols-[72px_1fr]">
			<p class="text-2md text-black lg:text-lg">{m.company_email_tit?.()}</p>
			<a href="mailto:{m.company_email_txt?.()}">{m.company_email_txt?.()}</a>
		</li>
		<li class="grid grid-cols-[72px_1fr]">
			<p class="text-2md text-black lg:text-lg">{m.company_fax_tit?.()}</p>
			<p>{m.company_fax_txt?.()}</p>
		</li>
	</ul>
</section>
