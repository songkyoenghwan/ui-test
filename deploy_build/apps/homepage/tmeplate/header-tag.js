class HeaderTag extends HTMLElement {
	constructor() {
		super();
		this.rendered = false;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.rendered = true;
		this.innerHTML = /* HTML */ `
			<header
				class="header bg-f5f5f5 group/header z-5 max-w-dvw has-checked:bg-white! 2xl:has-checked:grid-cols-2 2xl:has-checked:items-start fixed left-0 top-0 grid w-full place-items-center backdrop-blur-[20px]"
			>
				<header-imgs
					class="2xl:group-has-checked/header:flex 2xl:group-has-checked/header:h-dvh relative z-20 hidden w-full overflow-clip object-cover"
					name="left"
				></header-imgs>

				<div
					class="transition-discrete group-has-checked/header:bg-white md:py-7.5 2xl:items-start 2xl:group-has-checked/header:px-12 flex w-full max-w-490 flex-1 items-center justify-between gap-3 px-2.5 py-5 md:px-10"
				>
					<p>
						<a href="/output/html/" title="deepfine homepage">
							<span class="sr-only">deepfine</span>
							<header-imgs name="logo"></header-imgs>
						</a>
					</p>

					<div class="gap-7.5 flex items-center">
						<nav class="group-has-checked/header:hidden relative z-10 hidden items-center gap-5 lg:flex">
							<ul class="lg:gap-7.5 2xl:gap-15 2xl:group-has-checked/header:gap-5 flex text-2xl">
								<li class="group/products relative" aria-current="false">
									<button class="group-aria-[current=page]/products:text-primary flex min-h-12 items-center justify-center gap-2.5 hover:underline" type="button">
										<span class="group-hover/products:text-primary">Products</span>
										<icon-list
											class="group-hover/products:stroke-primary group-aria-[current=page]/products:stroke-primary size-6 rotate-180 stroke-black transition-all group-hover/products:grid group-hover/products:rotate-0"
											name="arrow-down"
										></icon-list>
									</button>
									<ul
										class="top-9/10 w-132.5 absolute -left-60 hidden grid-rows-3 gap-2.5 rounded-xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group-hover/products:grid peer-checked:grid"
									>
										<li class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100" aria-current="false">
											<a href="/output/html/logi.html" aria-label="logi.fine page">
												<header-imgs name="logi"></header-imgs>
											</a>
										</li>
										<li class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100" aria-current="page">
											<a href="/output/html/dao.html" aria-label="dao page"><header-imgs name="dao"></header-imgs></a>
										</li>
										<li class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100" aria-current="false">
											<a href="/output/html/dsc.html" aria-label="dsc page"><header-imgs name="dsc"></header-imgs></a>
										</li>
									</ul>
								</li>
								<li>
									<a
										class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline"
										href="/output/html/company.html"
										aria-current="false"
									>
										Company
									</a>
								</li>
								<li>
									<a
										class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline"
										href="/output/html/news.html"
										aria-current="false"
									>
										News
									</a>
								</li>
								<li>
									<a
										class="bg-primary hover:text-primary hover:border-primary border-primary group flex min-h-12 items-center gap-2 rounded-md border px-5 text-white hover:border hover:bg-white"
										href="/output/html/contact.html"
										aria-current="false"
									>
										<span class="flex-none text-lg">Contact Sales</span>
										<icon-list class="group-hover:stroke-primary size-6 stroke-white" name="arrow-right"></icon-list>
									</a>
								</li>
							</ul>
						</nav>

						<label
							class="bg-d8d8d8 hover:outline-primary has-checked:bg-primary has-checked:border-primary group flex size-12 items-center justify-center gap-2 rounded-md hover:bg-white hover:outline"
							for="gnb-menu"
						>
							<span class="sr-only">menu</span>
							<input class="peer sr-only" id="gnb-menu" type="checkbox" name="gnb-menu" />
							<icon-list class="group-hover:fill-primary size-6 stroke-black peer-checked:hidden" name="menu"></icon-list>
							<icon-list class="hidden size-6 stroke-white peer-checked:flex" name="close"></icon-list>
						</label>
					</div>
				</div>
				<div
					class="group-has-checked/header:grid lg:px-12.5 2xl:right-0 2xl:left-auto 2xl:h-[calc(100dvh-108px)] 2xl:w-[50dvw] 2xl:px-12 starting:opacity-0 fixed left-0 top-22 hidden h-[calc(100dvh-88px)] w-dvw overflow-y-auto bg-white px-5 opacity-100 shadow-md lg:top-27 lg:h-[calc(100dvh-6.75rem)]"
				>
					<div class="flex flex-col">
						<section class="flex flex-col justify-between gap-5 pt-10 font-bold">
							<ul class="2xl:gap-5 grid gap-10 text-2xl">
								<li class="grid gap-5">
									<h2 class="text-666 text-lg">Products</h2>
									<ul>
										<li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20">
											<a
												class="aria-[current=page]:text-primary pb-2.5 leading-tight underline-offset-4 hover:underline"
												href="/output/html/logi.html"
												aria-current="false"
											>
												LOGI.FINE
											</a>
										</li>
										<li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20">
											<a
												class="aria-[current=page]:text-primary py-2.5 leading-tight underline-offset-4 hover:underline"
												href="/output/html/dao.html"
												aria-current="false"
											>
												DAO
												<span class="text-lg font-normal">(DEEP.FINE AR.ON)</span>
											</a>
										</li>
										<li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20">
											<a
												class="aria-[current=page]:text-primary pt-2.5 leading-tight underline-offset-4 hover:underline"
												href="/output/html/dsc.html"
												aria-current="false"
											>
												DSC
												<span class="text-lg font-normal">(DEEP.FINE Spatial Crafter)</span>
											</a>
										</li>
									</ul>
								</li>
								<li class="grid">
									<h2>
										<a class="aria-[current=page]:text-primary underline-offset-4 hover:underline" href="/output/html/company.html" aria-current="false">
											Company
										</a>
									</h2>
								</li>
								<li class="grid">
									<h2>
										<a class="aria-[current=page]:text-primary underline-offset-4 hover:underline" href="/output/html/news.html" aria-current="false">News</a>
									</h2>
								</li>
								<li class="grid">
									<h2>
										<a class="aria-[current=page]:text-primary underline-offset-4 hover:underline" href="/output/html/contact.html" aria-current="page">
											Contact Sales
										</a>
									</h2>
								</li>
							</ul>
						</section>
						<section class="lg:py-7.5 mt-auto flex flex-col justify-between gap-15 border-t border-t-black/20 py-5 lg:gap-5">
							<dl class="text-666 flex flex-col gap-5 text-lg">
								<dt class="font-bold">Downloads</dt>
								<dd class="inline-flex items-center gap-10">
									<ul class="inline-flex flex-wrap items-center gap-2.5">
										<li>
											<a
												class="hover:bg-primary min-h-10.5 group flex flex-none items-center gap-5 rounded-full border border-black px-5 py-1 font-normal hover:text-white"
												href="https://deepfine.my.salesforce.com/sfc/p/IR000001ZM92/a/TJ00000djirN/Lc54cHS.pbOehXcpItel0OxkWqb66lW7m.7qOou0CU0"
												aria-label="LOGI.FINE Brochure"
												target="_blank"
											>
												LOGI.FINE Brochure
												<icon-list class="size-6 stroke-black group-hover:stroke-white" name="import"></icon-list>
											</a>
										</li>
									</ul>
								</dd>
							</dl>
						</section>
						<section class="lg:py-7.5 flex flex-col justify-between gap-15 py-5 lg:gap-5">
							<dl class="text-666 flex items-center justify-between gap-5 text-lg">
								<dt class="font-bold">Language</dt>
								<dd class="divde-x-black/20 inline-flex items-center divide-x">
									<button class="hover:bg-light-blue aria-current:text-black aria-current:underline px-5 text-2xl text-black/50 hover:underline" type="button">
										<span class="font-bold">EN</span>
									</button>
									<button
										class="hover:bg-light-blue aria-current:text-black aria-current:underline px-5 text-2xl text-black/50 hover:underline"
										type="button"
										aria-current="true"
									>
										<span class="font-bold">KR</span>
									</button>
								</dd>
							</dl>
						</section>
					</div>
				</div>
			</header>
		`;
	}
}

if (!customElements.get('header-tag')) {
	customElements.define('header-tag', HeaderTag);
}
