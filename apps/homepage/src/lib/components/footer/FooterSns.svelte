<svelte:options
	customElement={{
		tag: 'footer-sns',
		shadow: 'none',
	}}
/>

<ul class="inline-flex w-full items-center justify-center gap-7.5 lg:justify-end">
	<li class="size-12">
		<a
			href="https://www.instagram.com/deepfinecorp/"
			class="flex size-full"
			title="new window page insagram"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img loading="lazy" src="{__STATIC_URL__}/imgs/logo/icon-instagram.svg" alt="insagram" class="h-full" />
			<span class="sr-only">insagram</span>
		</a>
	</li>
	<li class="size-12">
		<a
			href="https://www.youtube.com/channel/UCRzU2-rKT06nbB8IVxOg0Lg"
			class="flex size-full"
			title="new window page youtube"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img loading="lazy" src="{__STATIC_URL__}/imgs/logo/icon-youtube.svg" alt="youtube" class="h-full" />
			<span class="sr-only">youtube</span>
		</a>
	</li>
	<li class="size-12">
		<a
			href="https://www.linkedin.com/company/deepfine/mycompany/"
			class="flex size-full"
			title="new window page linkedin"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img loading="lazy" src="{__STATIC_URL__}/imgs/logo/icon-linkedin.svg" alt="youtube" class="h-full" />
			<span class="sr-only">linkedin</span>
		</a>
	</li>
	<li class="size-12">
		<a
			href="https://blog.naver.com/PostList.naver?blogId=deepfine0722&amp;categoryNo=0&amp;from=postList"
			class="flex size-full"
			title="new window page blog naver"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img loading="lazy" src="{__STATIC_URL__}/imgs/logo/icon-blog.svg" alt="youtube" class="h-full" />
			<span class="sr-only">naver blog</span>
		</a>
	</li>
</ul>
