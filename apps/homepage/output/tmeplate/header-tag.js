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
				class="header bg-f5f5f5 group/header fixed top-0 left-0 z-5 grid w-full max-w-dvw place-items-center backdrop-blur-[20px] has-checked:bg-white! 2xl:has-checked:grid-cols-2 2xl:has-checked:items-start"
			>
				<header-imgs
					class="relative z-20 hidden w-full overflow-clip object-cover 2xl:group-has-checked/header:flex 2xl:group-has-checked/header:h-dvh"
					name="left"
				></header-imgs>

				<div
					class="flex w-full max-w-490 flex-1 items-center justify-between gap-3 px-5 py-5 transition-discrete group-has-checked/header:bg-white lg:px-10 lg:py-7.5 2xl:items-start 2xl:group-has-checked/header:px-12"
				>
					<p>
						<a href="/" title="deepfine homepage">
							<span class="sr-only">deepfine</span>
							<header-imgs name="logo"></header-imgs>
						</a>
					</p>

					<div class="flex items-center gap-7.5">
						<nav class="relative z-10 hidden items-center gap-5 group-has-checked/header:hidden lg:flex">
							<ul class="flex text-2xl lg:gap-7.5 2xl:gap-15 2xl:group-has-checked/header:gap-5">
								<li class="group/products relative" aria-current="false">
									<button
										class="group-aria-[current=page]/products:text-primary flex min-h-12 items-center justify-center gap-2.5 hover:underline"
										type="button"
									>
										<span class="group-hover/products:text-primary">Products</span>
										<icon-list
											class="group-hover/products:stroke-primary group-aria-[current=page]/products:stroke-primary size-6 rotate-180 stroke-black transition-all group-hover/products:grid group-hover/products:rotate-0"
											name="arrow-down"
										></icon-list>
									</button>
									<ul
										class="absolute top-9/10 -left-60 hidden w-132.5 grid-rows-3 gap-2.5 rounded-xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group-hover/products:grid peer-checked:grid"
									>
										<li
											class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100"
											aria-current="false"
										>
											<a href="/logi" aria-label="logi.fine page">
												<header-imgs name="logi"></header-imgs>
											</a>
										</li>
										<li
											class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100"
											aria-current="page"
										>
											<a href="/dao" aria-label="dao page"><header-imgs name="dao"></header-imgs></a>
										</li>
										<li
											class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100"
											aria-current="false"
										>
											<a href="/dsc" aria-label="dsc page"><header-imgs name="dsc"></header-imgs></a>
										</li>
									</ul>
								</li>
								<li>
									<a
										class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline"
										href="/company"
										aria-current="false"
									>
										Company
									</a>
								</li>
								<li>
									<a
										class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline"
										href="/news"
										aria-current="false"
									>
										News
									</a>
								</li>
								<li>
									<a
										class="bg-primary hover:text-primary hover:border-primary group border-primary flex min-h-12 items-center gap-2 rounded-md border px-5 text-white hover:border hover:bg-white"
										href="/contact"
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
					class="fixed top-22 left-0 hidden h-[calc(100dvh-88px)] w-dvw overflow-y-auto bg-white px-5 opacity-100 shadow-md group-has-checked/header:flex lg:top-27 lg:h-[calc(100dvh-6.75rem)] lg:px-12.5 2xl:right-0 2xl:left-auto 2xl:h-[calc(100dvh-108px)] 2xl:w-[50dvw] 2xl:px-12 starting:opacity-0"
				>
					<div class="flex flex-1 flex-col">
						<section class="flex flex-col justify-between gap-5 pt-10 font-bold">
							<ul class="flex flex-col gap-10 text-2xl 2xl:gap-5">
								<li class="flex flex-col gap-5">
									<h2 class="text-666 text-lg">Products</h2>
									<ul class="relative before:absolute before:h-full before:w-px before:bg-black/20">
										<li class="flex items-center pl-5">
											<a
												class="aria-[current=page]:text-primary pb-2.5 leading-tight underline-offset-4 hover:underline"
												href="/logi"
												aria-current="false"
											>
												LOGI.FINE
											</a>
										</li>
										<li class="flex items-center pl-5">
											<a
												class="aria-[current=page]:text-primary py-2.5 leading-tight underline-offset-4 hover:underline"
												href="/dao"
												aria-current="false"
											>
												DAO
												<span class="text-lg font-normal">(DEEP.FINE AR.ON)</span>
											</a>
										</li>
										<li class="flex items-center pl-5">
											<a
												class="aria-[current=page]:text-primary pt-2.5 leading-tight underline-offset-4 hover:underline"
												href="/dsc"
												aria-current="false"
											>
												DSC
												<span class="text-lg font-normal">(DEEP.FINE Spatial Crafter)</span>
											</a>
										</li>
									</ul>
								</li>
								<li class="flex flex-col">
									<h2>
										<a
											class="aria-[current=page]:text-primary underline-offset-4 hover:underline"
											href="/company"
											aria-current="false"
										>
											Company
										</a>
									</h2>
								</li>
								<li class="flex flex-col">
									<h2>
										<a
											class="aria-[current=page]:text-primary underline-offset-4 hover:underline"
											href="/news"
											aria-current="false"
										>
											News
										</a>
									</h2>
								</li>
								<li class="flex flex-col">
									<h2>
										<a
											class="aria-[current=page]:text-primary underline-offset-4 hover:underline"
											href="/contact"
											aria-current="page"
										>
											Contact Sales
										</a>
									</h2>
								</li>
							</ul>
						</section>
						<section class="mt-auto flex flex-col justify-between gap-15 py-5 lg:gap-5 lg:py-7.5">
							<dl class="text-666 flex flex-col gap-5 border-t border-t-black/20 pt-5 text-lg">
								<dt class="font-bold">Downloads</dt>
								<dd class="inline-flex items-center gap-10">
									<ul class="inline-flex flex-wrap items-center gap-2.5">
										<li>
											<a
												class="hover:bg-primary group flex min-h-10.5 flex-none items-center gap-5 rounded-full border border-black px-5 py-1 font-normal hover:text-white"
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
						<section class="flex flex-col justify-between gap-15 border-t border-t-black/20 py-5 lg:gap-5">
							<dl class="text-666 flex items-center justify-between gap-5 text-lg">
								<dt class="font-bold">Language</dt>
								<dd class="divde-x-black/20 inline-flex items-center divide-x">
									<button
										class="hover:bg-light-blue px-5 text-2xl text-black/50 hover:underline aria-current:text-black aria-current:underline"
										type="button"
									>
										<span class="font-bold">EN</span>
									</button>
									<button
										class="hover:bg-light-blue px-5 text-2xl text-black/50 hover:underline aria-current:text-black aria-current:underline"
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
