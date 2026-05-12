<svelte:options
	customElement={{
		tag: 'badge-text',
		shadow: 'none',
		props: {
			variant: { type: 'String', reflect: true },
			text: { type: 'String', reflect: true },
			size: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	type Variant = 'primary' | 'success' | 'danger' | 'warning' | 'wating';
	interface Props {
		variant?: Variant;
		text?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}
	let { variant = 'success' as Variant, size = 'md' as Props['size'], text = '' } = $props();

	const VARIANT_BG: Record<Variant, string> = {
		primary: 'bg-primary text-white',
		success: 'bg-edf6ee text-2f8b4c',
		danger: 'bg-fcebeb text-eb4321',
		warning: 'bg-fbf1d8 text-c58400',
		wating: 'bg-gray-200 text-black',
	};
	let variantBgClasses = $derived(VARIANT_BG[variant]);
	let sizeClasses = $derived(
		{
			xs: 'px-2 py-1 text-sm min-h-3.5 rounded-xs',
			sm: 'px-2 py-1 text-sm min-h-4.5 rounded-sm',
			md: 'px-2 py-1 text-2sm min-h-5.5 rounded-md',
			lg: 'px-4 py-2 text-base min-h-6.5 rounded-lg',
			xl: 'px-4 py-2 text-base min-h-7.5 rounded-xl',
		}[size ?? 'md'],
	);
</script>

<p class={['inline-grid transition-opacity duration-300 [word-break:auto-phrase]', variantBgClasses, sizeClasses]}>
	{text}
</p>
