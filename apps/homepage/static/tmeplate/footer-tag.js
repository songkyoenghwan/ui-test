class FooterTag extends HTMLElement {
    constructor() {
        super();
        this.rendered = false;
    }

    connectedCallback() {
        this.render();
    }


    render() {
        this.rendered = true;
        this.innerHTML = /* HTML */ `<footer class="text-2md text-666 p-5 pb-5 lg:pb-7.5 lg:text-lg" data-scroll="slide-up">
			<div class="relative rounded-xl bg-white lg:grid lg:grid-cols-2">
				<footer-adress class="flex flex-col gap-5 p-5 lg:p-7.5"></footer-adress>

				<section class="flex flex-col justify-between gap-15 p-5 lg:gap-5 lg:p-7.5">
					<ul class="grid grid-cols-2 gap-15 lg:grid-cols-4">
						<li class="grid gap-5">
							<h2 class="text-2md text-black lg:text-lg">Products</h2>
							<ul class="space-y-5">
								<li><a class="underline-offset-4 hover:underline" href="">Logi Grid</a></li>
								<li><a class="underline-offset-4 hover:underline" href="">DAO</a></li>
								<li><a class="underline-offset-4 hover:underline" href="">DSC</a></li>
							</ul>
						</li>
						<li class="grid">
							<h2 class="text-2md text-black lg:text-lg"><a class="underline-offset-4 hover:underline" href="/company">Company</a></h2>
						</li>
						<li class="grid">
							<h2 class="text-2md text-black lg:text-lg"><a class="underline-offset-4 hover:underline" href="/news/news">News</a></h2>
						</li>
						<li class="grid">
							<h2 class="text-2md text-black lg:text-lg"><a class="underline-offset-4 hover:underline" href="conatact">Conatact Sales</a></h2>
						</li>
					</ul>
					<footer-sns class="inline-flex w-full items-center justify-center gap-7.5 lg:justify-end"></footer-sns>
				</section>

				<footer-copy class="lg:col-span-2"></footer-copy>
			</div>
		</footer>`;
    }

}


if (!customElements.get('footer-tag')) {
    customElements.define('footer-tag', FooterTag);
}