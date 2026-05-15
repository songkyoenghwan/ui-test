<script lang="ts">
	import '$lib/styles/index.css';

	import '$lib/index';

	let { children } = $props();
</script>

<header class="header bg-f5f5f5 3xl:px-0 fixed top-0 left-0 z-5 flex w-full place-content-center px-5 py-5 md:py-7.5">
	<div class="flex w-full max-w-460 flex-1 justify-between">
		<h1>
			<a href="/"><img src="/imgs/logo/logo-deepfine.svg" alt="DEEP.FINE" class="w-41.75 lg:w-full" /></a>
		</h1>

		<div class=" hidden items-center gap-5 lg:flex">
			<nav>
				<ul class="flex gap-15">
					<li class="group/products relative">
						<button
							type="button"
							class="flex items-center justify-center gap-2.5 py-4"
							id="mega-menu-icons-dropdown-button"
							data-dropdown-toggle="mega-menu-icons-dropdown"
						>
							<span class="group-hover/products:text-primary">Products</span>
							<icon-list
								name="arrow-down"
								class="group-hover/products:stroke-primary size-6 rotate-180 stroke-black transition-all group-hover/products:grid group-hover/products:rotate-0"
							></icon-list>
						</button>
						<ul
							id="mega-menu-icons-dropdown"
							class="absolute top-full -left-60 hidden w-132.5 grid-rows-3 gap-2.5 rounded-xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group-hover/products:grid peer-checked:grid"
						>
							<li class="relative opacity-50 transition-all hover:opacity-100 has-aria-[current=page]:opacity-100">
								<a href="/"><img src="/imgs/logo/logo-header-logi.png" alt="DEEP.FINE" /></a>
							</li>
							<li class="relative opacity-50 transition-all hover:opacity-100 has-aria-[current=page]:opacity-100">
								<a href="/"><img src="/imgs/logo/log-header-dao.png" alt="DEEP.FINE" /></a>
							</li>
							<li class="relative opacity-50 transition-all hover:opacity-100 has-aria-[current=page]:opacity-100">
								<a href="/"><img src="/imgs/logo/logo-header-dsc.png" alt="DEEP.FINE" /></a>
							</li>
						</ul>
					</li>
					<li>
						<a href="/company" class="hover:text-primary flex items-center justify-center py-4">Company</a>
					</li>
					<li>
						<a href="/news" class="hover:text-primary flex items-center justify-center py-4">News</a>
					</li>
					<li>
						<a
							href="/contact"
							class="bg-primary hover:text-primary hover:border-primary group border-primary flex min-h-12 items-center gap-2 rounded-md border px-5 text-white hover:border hover:bg-white"
						>
							<span>Contact Sales</span>
							<icon-list name="tick-circle" class="group-hover:fill-primary size-6 fill-white"></icon-list>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</header>

<main class="">
	{@render children()}
</main>
