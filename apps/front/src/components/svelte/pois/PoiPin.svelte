<svelte:options
	customElement={{
		tag: 'poi-pin',
		shadow: 'none',
		props: {
			category: { reflect: true, type: 'String', attribute: 'data-category' },
			label: { reflect: true, type: 'String', attribute: 'data-label' },
			color: { reflect: true, type: 'String', attribute: 'data-color' },
			congestion: { reflect: true, type: 'String', attribute: 'data-congestion' },
			tooltipType: { type: 'String', attribute: 'data-tooltip-type' },
		},
	}}
/>

<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import IconCategory from '@/svelte/icons/IconCategory.svelte';
	import { v4 as uuidv4 } from 'uuid';

	let { tooltipType = '', category = '', label = '', color = '', congestion = 'none' } = $props();

	const _id = $derived(`filter-poi-pin-${uuidv4()}`);
	function getCongestionLabel() {
		switch (congestion) {
			case 'VERY_CROWDED':
				return m.usr_map_001_06({ locale: $langState });
			case 'CROWDED':
				return m.usr_map_001_07({ locale: $langState });
			case 'NORMAL':
				return m.usr_map_001_08({ locale: $langState });
			case 'RELAXED':
				return m.usr_map_001_09({ locale: $langState });
			case 'none':
			default:
				return '';
		}
	}
</script>

{#snippet tip()}
	{#if congestion !== '' && congestion !== 'none'}
		<span
			class={[
				'absolute w-max',
				tooltipType === 'category' ? 'bottom-full' : tooltipType === 'current' ? 'bottom-[calc(100%+16px)]' : '',
			]}
		>
			<span class="relative flex pb-2 text-xs text-white">
				<span class={['w-max rounded-sm px-1.5 py-1.25 font-medium', congestion]}>{getCongestionLabel()}</span>
				<svg
					class={['absolute left-[calc(50%-13px)] -translate-x-[calc(50%-13px)]']}
					width="36"
					height="30"
					viewBox="0 0 36 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19.4305 28.5359C18.6459 29.3389 17.3541 29.3389 16.5695 28.5359L11.7935 23.6477C10.556 22.3812 11.4534 20.25 13.224 20.25L22.776 20.25C24.5466 20.25 25.444 22.3812 24.2065 23.6477L19.4305 28.5359Z"
						stroke="none"
						class={congestion}
					/>
				</svg>
			</span>
		</span>
	{/if}
{/snippet}

{#snippet currentPin()}
	<span class="-mt-6 flex flex-col items-center justify-center gap-1" style:--category-color={color}>
		{@render tip()}

		<span class="relative">
			<svg
				width="49"
				height="55"
				viewBox="0 0 49 55"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="fill-(--base-color) stroke-(--base-color)"
			>
				<g opacity="0.6">
					<ellipse cx="24.1055" cy="50.6064" rx="10.5" ry="4" fill="#90A1B9" />
					<ellipse cx="24.1055" cy="50.1064" rx="6.5" ry="2.5" fill="#45556C" />
				</g>
				<g filter="url(#{_id})">
					<path
						d="M24.1055 6.60645C14.4805 6.60645 6.60547 14.4814 6.60547 24.1064C6.60547 32.9275 15.6797 43.3042 20.7596 48.4221C22.6255 50.3019 25.5855 50.3019 27.4513 48.4221C32.5313 43.3042 41.6055 32.9275 41.6055 24.1064C41.6055 14.4814 33.7305 6.60645 24.1055 6.60645Z"
						stroke="none"
					/>
					<path
						d="M24.1055 7.10645C33.4543 7.10645 41.1055 14.7576 41.1055 24.1064C41.1055 28.3644 38.9062 33.0608 36.0176 37.375C33.139 41.6742 29.6254 45.5227 27.0967 48.0703C25.4265 49.753 22.7845 49.7529 21.1143 48.0703C18.5855 45.5227 15.0719 41.6742 12.1934 37.375C9.30476 33.0608 7.10547 28.3644 7.10547 24.1064C7.10547 14.7576 14.7566 7.10645 24.1055 7.10645Z"
						stroke="url(#p-2-{_id})"
						stroke-opacity="0.3"
					/>
				</g>
				<g fill="white">
					<path
						d="M24.1055 36.6064C31.009 36.6064 36.6055 31.01 36.6055 24.1064C36.6055 17.2029 31.009 11.6064 24.1055 11.6064C17.2019 11.6064 11.6055 17.2029 11.6055 24.1064C11.6055 31.01 17.2019 36.6064 24.1055 36.6064Z"
						fill="white"
						shape-rendering="crispEdges"
					/>
					<path
						d="M24.1055 11.1064C31.2852 11.1064 37.1055 16.9267 37.1055 24.1064C37.1055 31.2861 31.2852 37.1064 24.1055 37.1064C16.9258 37.1064 11.1055 31.2861 11.1055 24.1064C11.1055 16.9267 16.9258 11.1064 24.1055 11.1064Z"
						stroke="url(#paint1_linear_5137_102707)"
						stroke-opacity="0.3"
						shape-rendering="crispEdges"
					/>
				</g>

				<defs>
					<filter
						id={_id}
						x="1.60547"
						y="1.60645"
						width="45"
						height="53.2256"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset />
						<feGaussianBlur stdDeviation="2.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5137_102707" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5137_102707" result="shape" />
					</filter>
					<linearGradient
						id="p-2-{_id}"
						x1="24.1055"
						y1="6.60645"
						x2="24.1055"
						y2="51.6064"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-opacity="0.2" />
						<stop offset="1" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_5137_102707"
						x1="24.1055"
						y1="11.6064"
						x2="24.1055"
						y2="36.6064"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-opacity="0.2" />
						<stop offset="1" />
					</linearGradient>
				</defs>
			</svg>

			<span class="absolute top-3.25 left-3.5 z-1">
				<IconCategory reverse="poi-current" icon={category} color="var(--base-color)" />
			</span>
		</span>

		<span class="line-clamp-2 max-w-26.25 text-xs/tight leading-3.25 text-black text-shadow-white">
			{label}
		</span>
	</span>
{/snippet}

{#snippet categoryPin()}
	<span class="relative flex flex-col items-center justify-center gap-1" style:--category-color={color}>
		{@render tip()}

		<span class="relative">
			<IconCategory reverse="poi" icon={category} {color} />
		</span>

		<span class="line-clamp-2 max-w-26.25 text-xs/tight leading-3.25 text-black text-shadow-white">
			{label}
		</span>
	</span>
{/snippet}

{#if tooltipType == 'current'}
	{@render currentPin()}
{:else if tooltipType === 'category'}
	{@render categoryPin()}
{/if}
