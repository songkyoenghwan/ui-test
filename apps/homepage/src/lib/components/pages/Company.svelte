<svelte:options
	customElement={{
		tag: 'sub-company',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { lenisStore } from '$lib/utils/scrollMove.svelte';
	import Lenis from 'lenis';

	const division1 = `${__STATIC_URL__}/imgs/company/img-division-1.png`;
	const division2 = `${__STATIC_URL__}/imgs/company/img-division-2.png`;
	const division3 = `${__STATIC_URL__}/imgs/company/img-division-3.png`;
	const division4 = `${__STATIC_URL__}/imgs/company/img-division-4.png`;
	const bannerBgMo = `${__STATIC_URL__}/imgs/company/bg-join-us-mo.png`;
	const bannerBgPc = `${__STATIC_URL__}/imgs/company/bg-join-us-pc.png`;
	const bgPerson = `${__STATIC_URL__}/imgs/company/bg-join-us-person.png`;
	const sign = `${__STATIC_URL__}/imgs/ceo/img-sign.png`;

	const teams = $state([
		{
			img: division1,
			team: m.our_teams_team_1(),
			subtitle: m.our_teams_subtitle_1(),
			list: [m.our_teams_list_1_1(), m.our_teams_list_1_2(), m.our_teams_list_1_3(), m.our_teams_list_1_4()],
		},
		{
			img: division2,
			team: m.our_teams_team_2(),
			subtitle: m.our_teams_subtitle_2(),
			list: [m.our_teams_list_2_1(), m.our_teams_list_2_2(), m.our_teams_list_2_3(), m.our_teams_list_2_4()],
		},
		{
			img: division3,
			team: m.our_teams_team_3(),
			subtitle: m.our_teams_subtitle_3(),
			list: [m.our_teams_list_3_1(), m.our_teams_list_3_2(), m.our_teams_list_3_3(), m.our_teams_list_3_4()],
		},
		{
			img: division4,
			team: m.our_teams_team_4(),
			subtitle: m.our_teams_subtitle_4(),
			list: [m.our_teams_list_4_1(), m.our_teams_list_4_2(), m.our_teams_list_4_3(), m.our_teams_list_4_4()],
		},
	]);

	$effect(() => {
		const lenis = new Lenis({
			autoRaf: true,
		});

		lenisStore.setInstance(lenis);

		return () => {
			lenisStore.clear();
		};
	});
</script>

<section data-scroll="first" class="text-2md grid gap-5 rounded-xl bg-white p-5 drop-shadow-md transition-all lg:gap-15 lg:p-15">
	<h3 class="relative z-2 text-2xl font-bold lg:text-5xl">CEO Message</h3>

	<div class="relative z-4 space-y-5 lg:space-y-10 lg:whitespace-pre-line">
		<p class="text-lg font-bold lg:text-4xl">
			{m.ceo_txt_0()}
		</p>

		<p class="text-2md lg:text-2xl">
			{m.ceo_text_1()}
		</p>
		<p class="text-2md lg:text-2xl">
			{m.ceo_text_2()}
		</p>
		<p class="text-2md lg:text-2xl">
			{m.ceo_text_3()}
		</p>
	</div>

	<div class="relative z-2 space-y-2.5">
		<p class="text-sm font-bold lg:text-lg">CEO</p>
		<p class="text-2md lg:text-2xl">
			{m.ceo_name()}
		</p>

		<picture>
			<img loading="lazy" src={sign} alt={m.ceo_name()} />
		</picture>
	</div>

	<div
		class="relative z-1 h-full w-full max-w-273.5 before:absolute before:-left-5 before:z-3 before:h-20 before:w-full before:bg-linear-to-b before:from-white/10 before:to-transparent xl:absolute xl:right-0 xl:bottom-0"
	>
		<video class="relative z-1 aspect-video h-full w-full max-w-273.5 object-cover" autoplay muted playsinline loop>
			<source src={`${__STATIC_URL__}/video/ceo-video.mp4`} type="video/mp4" />
		</video>
	</div>
</section>

<section class="text-2md grid gap-5 rounded-xl bg-white p-5 drop-shadow-md transition-all lg:gap-15 lg:p-15">
	<h3 class="text-2xl font-bold lg:text-5xl">Our Teams</h3>

	<ul class="text-2md grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-15 lg:text-lg">
		{#each teams as team, i (`team-${i}`)}
			<li data-scroll="slide-up" class="bg-light-blue flex flex-col overflow-clip rounded-xl">
				<picture class="flex">
					<img loading="lazy" src={team.img} alt={team.team} class="w-full" />
				</picture>

				<div class="flex flex-col gap-5 p-5 lg:gap-7.5 lg:p-7.5">
					<h4 class="text-primary text-2xl font-bold lg:text-4xl">{team.team}</h4>
					<p class="text-666">{team.subtitle}</p>

					<ul>
						{#each team.list as list, i (`team-text-${i}`)}
							<li class="text-dot">{list}</li>
						{/each}
					</ul>
				</div>
			</li>
		{/each}
	</ul>

	<section
		data-scroll="slide-up"
		class="min-h-80.5 rounded-xl bg-(image:--bg-mo) bg-cover bg-bottom bg-no-repeat text-white transition-all lg:min-h-63.75 lg:bg-(image:--bg-pc)"
		style="--bg-mo: url('{bannerBgMo}'); --bg-pc: url('{bannerBgPc}'); --bg-person: url('{bgPerson}');"
	>
		<div
			class="flex h-full flex-col gap-5 bg-(image:--bg-person) bg-size-[203px_auto] bg-position-[calc(100%-20px)_calc(100%+60px)] bg-no-repeat p-5 lg:bg-size-[345px_353px] lg:bg-position-[calc(100%-5%)_top] lg:p-15"
		>
			<h4 class="text-2xl leading-tight font-bold text-white text-shadow-md lg:max-w-4/6 lg:text-5xl">{m.join_text()}</h4>

			<div class="flex w-full items-center lg:inline-flex">
				<a
					href="/"
					class="hover:text-primary group flex min-h-12 flex-1 items-center justify-between gap-2 rounded-md border border-white px-5 text-white hover:bg-white lg:flex-none lg:justify-baseline"
				>
					<span>{m.join_btn()}</span>
					<icon-list name="arrow-new-link" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
				</a>
			</div>
		</div>
	</section>
</section>
