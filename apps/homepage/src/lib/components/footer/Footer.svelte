<svelte:options
	customElement={{
		tag: 'footer-section',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
</script>

<footer data-scroll="slide-up" class="text-2md text-666 p-5 pb-5 lg:pb-7.5 lg:text-lg">
	<div class="relative rounded-xl bg-white lg:grid lg:grid-cols-2">
		<section class="flex flex-col gap-5 p-5 lg:p-7.5">
			<p><img src="/imgs/logo/logo-deepfine.svg" alt="DEEP.FINE" class="w-35 lg:w-69.25" /></p>
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
			<ul class="inline-flex w-full items-center justify-center gap-7.5 lg:justify-end">
				<li class="size-12 bg-[url(/src/lib/imgs/logo/icon-instagram.svg)] bg-cover bg-center bg-no-repeat">
					<a href="https://www.instagram.com/deepfinecorp/" class="flex size-full" title="new window page insagram" target="_blank" rel="noopener noreferrer">
						<i class="icon icon-insta"></i>
						<span class="sr-only">insagram</span>
					</a>
				</li>
				<li class="size-12 bg-[url(/src/lib/imgs/logo/icon-youtube.svg)] bg-cover bg-center bg-no-repeat">
					<a
						href="https://www.youtube.com/channel/UCRzU2-rKT06nbB8IVxOg0Lg"
						class="flex size-full"
						title="new window page youtube"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="sr-only">youtube</span>
					</a>
				</li>
				<li class="size-12 bg-[url(/src/lib/imgs/logo/icon-linkedin.svg)] bg-cover bg-center bg-no-repeat">
					<a
						href="https://www.linkedin.com/company/deepfine/mycompany/"
						class="flex size-full"
						title="new window page linkedin"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="icon icon-linked"></i>
						<span class="sr-only">linkedin</span>
					</a>
				</li>
				<li class="size-12 bg-[url(/src/lib/imgs/logo/icon-blog.svg)] bg-cover bg-center bg-no-repeat">
					<a
						href="https://blog.naver.com/PostList.naver?blogId=deepfine0722&amp;categoryNo=0&amp;from=postList"
						class="flex size-full"
						title="new window page blog naver"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="icon icon-blog"></i>
						<span class="sr-only">naver blog</span>
					</a>
				</li>
			</ul>
		</section>

		<section class="border-t-dashed border-t-d9d9d9 border-t p-5 text-center lg:col-span-2">
			<p>
				ⓒ {new Date().getUTCFullYear()}. DEEP.FINE Co., Ltd. All rights reserved.
			</p>
		</section>
	</div>
</footer>
