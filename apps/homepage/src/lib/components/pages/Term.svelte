<svelte:options
	customElement={{
		tag: 'sub-term',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
</script>

<main class="sub">
	<sub-heading-line title="개인정보처리방침"></sub-heading-line>

	<section class="text-2md grid gap-5 rounded-xl bg-white p-5 lg:gap-15 lg:p-15 lg:text-lg">
		<p>{m.term_privacy_intro()}</p>

		<div class="space-y-5 whitespace-pre-line lg:space-y-15">
			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_1_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<p>{m.term_privacy_section_1_desc()}</p>

					<ul class="space-y-5 lg:space-y-7.5">
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_1_item_1_title()}</strong>
							<p>{m.term_privacy_section_1_item_1_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_1_item_2_title()}</strong>
							<p>{m.term_privacy_section_1_item_2_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_1_item_3_title()}</strong>
							<p>{m.term_privacy_section_1_item_3_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_1_item_4_title()}</strong>
							<p>{m.term_privacy_section_1_item_4_desc()}</p>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_2_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<ul class="space-y-5 lg:space-y-7.5">
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_2_item_1()}</strong>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_2_item_2_title()}</strong>
							<p>{m.term_privacy_section_2_item_2_desc()}</p>
							<p>{m.term_privacy_section_2_item_2_desc_2()}</p>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_3_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<p>{m.term_privacy_section_3_desc()}</p>

					<p class="font-bold lg:text-2xl">{m.term_privacy_section_4_title()}</p>
					<ul class="space-y-5 lg:space-y-7.5">
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_4_item_1()}</strong></li>
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_4_item_2()}</strong></li>
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_4_item_3()}</strong></li>
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_4_item_4()}</strong></li>
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_4_item_5()}</strong></li>
					</ul>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_5_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<p>{m.term_privacy_section_5_desc()}</p>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_6_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<ul class="space-y-5 lg:space-y-7.5">
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_6_item_1()}</strong></li>
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_6_item_2()}</strong></li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_6_item_3_title()}</strong>
							<p>{m.term_privacy_section_6_item_3_desc()}</p>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_7_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<p>{m.term_privacy_section_7_desc()}</p>
					<ul class="space-y-5 lg:space-y-7.5">
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_7_item_1_title()}</strong>
							<p>{m.term_privacy_section_7_item_1_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_7_item_2_title()}</strong>
							<p>{m.term_privacy_section_7_item_2_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_7_item_3_title()}</strong>
							<p>{m.term_privacy_section_7_item_3_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_7_item_4_title()}</strong>
							<p>{m.term_privacy_section_7_item_4_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_7_item_5_title()}</strong>
							<p>{m.term_privacy_section_7_item_5_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_7_item_6_title()}</strong>
							<p>{m.term_privacy_section_7_item_6_desc()}</p>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_7_item_7_title()}</strong>
							<p>{m.term_privacy_section_7_item_7_desc()}</p>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_8_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<ul class="space-y-5 lg:space-y-7.5">
						<li class="grid gap-2.5"><strong class="lg:text-2xl">{m.term_privacy_section_8_item_1()}</strong></li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">{m.term_privacy_section_8_item_2_title()}</strong>
							<p>{m.term_privacy_section_8_item_2_desc()}</p>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_9_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<p>{m.term_privacy_section_9_desc()}</p>

					<div class="grid gap-2.5">
						<strong class="lg:text-2xl">{m.term_privacy_section_9_officer_title()}</strong>
						<ul class="space-y-2.5">
							<li>{m.term_privacy_section_9_officer_name()}</li>
							<li>{m.term_privacy_section_9_officer_role()}</li>
							<li>{m.term_privacy_section_9_officer_phone()}</li>
							<li>{m.term_privacy_section_9_officer_email()}</li>
							<li>{m.term_privacy_section_9_officer_note()}</li>
						</ul>
					</div>

					<ul class="space-y-5 lg:space-y-7.5">
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">
								{m.term_privacy_agency_1()} (
								<a href="https://www.kopico.go.kr" class="text-primary underline" target="_blank" rel="noopener noreferrer">www.kopico.go.kr</a>
								)
							</strong>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">
								{m.term_privacy_agency_2()} (
								<a href="https://privacy.kisa.or.kr" class="text-primary underline" target="_blank" rel="noopener noreferrer">privacy.kisa.or.kr</a>
								)
							</strong>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">
								{m.term_privacy_agency_3()} (
								<a href="https://www.spo.go.kr" class="text-primary underline" target="_blank" rel="noopener noreferrer">www.spo.go.kr</a>
								)
							</strong>
						</li>
						<li class="grid gap-2.5">
							<strong class="lg:text-2xl">
								{m.term_privacy_agency_4()} (
								<a href="https://ecrm.cyber.go.kr" class="text-primary underline" target="_blank" rel="noopener noreferrer">ecrm.cyber.go.kr</a>
								)
							</strong>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="space-y-2.5 lg:space-y-7.5">
				<dt class="text-primary text-lg font-bold lg:text-4xl">{m.term_privacy_section_10_title()}</dt>
				<dd class="inline-grid gap-5 lg:gap-7.5">
					<p>{m.term_privacy_section_10_desc()}</p>
				</dd>
			</dl>
		</div>
	</section>
</main>
