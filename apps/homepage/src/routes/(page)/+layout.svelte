<script lang="ts">
	import '$lib/styles/index.css';
	import '$lib/index';

	let { children } = $props();
</script>

<!-- 현재 창 활성 시 -  aria-current="page" 를 생성, 언어 선택시 aria-current="true" 생성 -->
<header
	class="header bg-f5f5f5 group/header fixed top-0 left-0 z-5 grid w-full max-w-dvw place-items-center has-checked:bg-white! 2xl:has-checked:grid-cols-2 2xl:has-checked:items-start"
>
	<header-imgs name="left" class="relative z-20 hidden w-full overflow-clip object-cover 2xl:group-has-checked/header:flex"></header-imgs>

	<div
		class="flex w-full max-w-460 flex-1 items-center justify-between gap-3 px-5 py-5 transition-discrete group-has-checked/header:bg-white md:py-7.5 2xl:items-start 2xl:px-12"
	>
		<h1>
			<a href="/" title="deepfine homepage">
				<span class="sr-only">deepfine</span>
				<header-imgs name="logo"></header-imgs>
			</a>
		</h1>

		<div class="flex items-center gap-7.5">
			<nav class="relative z-10 hidden items-center gap-5 lg:flex">
				<ul class="flex gap-15 2xl:group-has-checked/header:gap-5">
					<li class="group/products relative" aria-current="false">
						<button type="button" class="group-aria-[current=page]/products:text-primary flex min-h-12 items-center justify-center gap-2.5 hover:underline">
							<span class="group-hover/products:text-primary">Products</span>
							<icon-list
								name="arrow-down"
								class="group-hover/products:stroke-primary group-aria-[current=page]/products:stroke-primary size-6 rotate-180 stroke-black transition-all group-hover/products:grid group-hover/products:rotate-0"
							></icon-list>
						</button>
						<ul
							class="absolute top-9/10 -left-60 hidden w-132.5 grid-rows-3 gap-2.5 rounded-xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group-hover/products:grid peer-checked:grid"
						>
							<li class="aria-[current=page]:text-primary:opacity-100 relative opacity-50 transition-all hover:opacity-100" aria-current="false">
								<a href="/logi" aria-label="logi.fine page">
									<header-imgs name="logi"></header-imgs>
								</a>
							</li>
							<li class="aria-[current=page]:text-primary:opacity-100 relative opacity-50 transition-all hover:opacity-100" aria-current="false">
								<a href="/dao" aria-label="dao page"><header-imgs name="dao"></header-imgs></a>
							</li>
							<li class="aria-[current=page]:text-primary:opacity-100 relative opacity-50 transition-all hover:opacity-100" aria-current="false">
								<a href="/dsc" aria-label="dsc page"><header-imgs name="dsc"></header-imgs></a>
							</li>
						</ul>
					</li>
					<li>
						<a
							href="/company"
							class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline"
							aria-current="false"
						>
							Company
						</a>
					</li>
					<li>
						<a href="/news" class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline" aria-current="false">
							News
						</a>
					</li>
					<li>
						<a
							href="/contact"
							class="bg-primary hover:text-primary hover:border-primary group border-primary flex min-h-12 items-center gap-2 rounded-md border px-5 text-white hover:border hover:bg-white"
							aria-current="false"
						>
							<span class="flex-none">Contact Sales</span>
							<icon-list name="tick-circle" class="group-hover:fill-primary size-6 fill-white"></icon-list>
						</a>
					</li>
				</ul>
			</nav>

			<label
				for="gnb-menu"
				class="bg-d8d8d8 hover:outline-primary has-checked:bg-primary has-checked:border-primary group flex size-12 items-center justify-center gap-2 rounded-md hover:bg-white hover:outline"
			>
				<span class="sr-only">menu</span>
				<input type="checkbox" name="gnb-menu" id="gnb-menu" class="peer sr-only" />
				<icon-list name="menu" class="group-hover:fill-primary size-6 stroke-black peer-checked:hidden"></icon-list>
				<icon-list name="close" class="hidden size-6 stroke-white peer-checked:flex"></icon-list>
			</label>
		</div>
	</div>
	<div
		class="fixed top-22 left-0 hidden max-h-[calc(100vh-88px)] w-dvw overflow-y-auto bg-white px-5 opacity-100 shadow-md group-has-checked/header:grid lg:top-27 lg:px-12.5 2xl:right-0 2xl:left-auto 2xl:h-[calc(100dvh-108px)] 2xl:w-[50dvw] 2xl:px-12 starting:opacity-0"
	>
		<div class="divide-y divide-black/20">
			<section class="flex flex-col justify-between gap-15 py-5 font-bold lg:gap-5 lg:py-7.5">
				<ul class="grid gap-10 text-2xl 2xl:gap-5">
					<li class="grid gap-5">
						<h2 class="text-666 text-lg">Products</h2>
						<ul>
							<li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20">
								<a href="/logi" class="aria-[current=page]:text-primary py-2.5 underline-offset-4 hover:underline" aria-current="false">Logi Grid</a>
							</li>
							<li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20">
								<a href="/dao" class="aria-[current=page]:text-primary py-2.5 underline-offset-4 hover:underline" aria-current="false">
									DAO
									<span class="text-lg font-normal">(DEEP.FINE AR.ON)</span>
								</a>
							</li>
							<li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20">
								<a href="/dsc" class="aria-[current=page]:text-primary py-2.5 underline-offset-4 hover:underline" aria-current="false">
									DSC
									<span class="text-lg font-normal">(DEEP.FINE Spatial Crafter)</span>
								</a>
							</li>
						</ul>
					</li>
					<li class="grid">
						<h2>
							<a href="/company" class="aria-[current=page]:text-primary underline-offset-4 hover:underline" aria-current="false">Company</a>
						</h2>
					</li>
					<li class="grid">
						<h2>
							<a href="/news" class="aria-[current=page]:text-primary underline-offset-4 hover:underline" aria-current="false">News</a>
						</h2>
					</li>
					<li class="grid">
						<h2>
							<a href="/contact" class="aria-[current=page]:text-primary underline-offset-4 hover:underline" aria-current="page">Contact Sales</a>
						</h2>
					</li>
				</ul>
			</section>
			<section class="flex flex-col justify-between gap-15 py-5 lg:gap-5 lg:py-7.5">
				<dl class="text-666 flex flex-col gap-5 text-lg">
					<dt class="font-bold">Downloads</dt>
					<dd class="inline-flex items-center gap-10">
						<p>Logis Grid</p>
						<ul class="inline-flex flex-wrap items-center gap-2.5">
							<li>
								<a
									href=""
									download="Logis Grid Demo"
									class="hover:bg-primary group flex min-h-10.5 flex-none items-center gap-5 rounded-full border border-black px-5 py-1 font-normal hover:text-white"
								>
									Logis Grid Demo
									<icon-list name="import" class="size-6 stroke-black group-hover:stroke-white"></icon-list>
								</a>
							</li>
							<li>
								<a
									href=""
									download="Logis Grid Brochure"
									class="hover:bg-primary group flex min-h-10.5 flex-none items-center gap-5 rounded-full border border-black px-5 py-1 font-normal hover:text-white"
								>
									Logis Grid Brochure
									<icon-list name="import" class="size-6 stroke-black group-hover:stroke-white"></icon-list>
								</a>
							</li>
						</ul>
					</dd>
					<dd class="inline-flex items-center gap-10">
						<p>Company</p>
						<ul class="inline-flex flex-wrap items-center gap-2.5">
							<li>
								<a
									href=""
									download="Company Brochure"
									class="hover:bg-primary group flex min-h-10.5 flex-none items-center gap-5 rounded-full border border-black px-5 py-1 font-normal hover:text-white"
								>
									Company Brochure
									<icon-list name="import" class="size-6 stroke-black group-hover:stroke-white"></icon-list>
								</a>
							</li>
						</ul>
					</dd>
				</dl>
			</section>
			<section class="flex flex-col justify-between gap-15 py-5 lg:gap-5 lg:py-7.5">
				<dl class="text-666 flex items-center justify-between gap-5 text-lg">
					<dt class="font-bold">Language</dt>
					<dd class="divde-x-black/20 inline-flex items-center divide-x">
						<button class="aria-current:text-primary hover:bg-light-blue px-5 text-2xl text-black/50 hover:underline" type="button">
							<span class="font-bold">EN</span>
						</button>
						<button class="aria-current:text-primary hover:bg-light-blue px-5 text-2xl text-black/50 hover:underline" type="button" aria-current="true">
							<span class="font-bold">KR</span>
						</button>
					</dd>
				</dl>
			</section>
		</div>
	</div>
</header>

<main class="">
	{@render children()}
</main>

<footer data-scroll="slide-up" class="text-2md text-666 p-5 pb-5 lg:pb-7.5 lg:text-lg">
	<div class="relative rounded-xl bg-white lg:grid lg:grid-cols-2">
		<footer-adress class="flex flex-col gap-5 p-5 lg:p-7.5"></footer-adress>

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
					<h2 class="text-2md text-black lg:text-lg">
						<a href="/company" class="underline-offset-4 hover:underline">Company</a>
					</h2>
				</li>
				<li class="grid">
					<h2 class="text-2md text-black lg:text-lg"><a href="/news/news" class="underline-offset-4 hover:underline">News</a></h2>
				</li>
				<li class="grid">
					<h2 class="text-2md text-black lg:text-lg">
						<a href="conatact" class="underline-offset-4 hover:underline">Conatact Sales</a>
					</h2>
				</li>
			</ul>
			<footer-sns class="inline-flex w-full items-center justify-center gap-7.5 lg:justify-end"></footer-sns>
		</section>

		<footer-copy class="lg:col-span-2"></footer-copy>
	</div>
</footer>
