<!-- <svelte:options
	customElement={{
		tag: 'badge-text',
		shadow: 'none',
		props: {
			variant: { type: 'String', reflect: true },
			text: { type: 'String', reflect: true },
			size: { type: 'String', reflect: true },
		},
	}}
/> -->

<script lang="ts">
	type Variant = 'primary' | 'succes' | 'complete' | 'pending' | 'danger' | 'incomplete' | 'wating' | 'BEFORE' | 'IN_PROGRESS' | 'COMPLETED';
	interface Props {
		variant?: Variant;
		text?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}
	let { variant = 'success' as Variant, size = 'md' as Props['size'], text = '' } = $props();

	const VARIANT_BG: Record<Variant, string> = {
		primary: 'bg-primary text-white',
		succes: 'bg-succes text-succes-frg',
		complete: 'bg-succes text-succes-frg',
		pending: 'bg-pending text-pending-frg',
		danger: 'bg-destructive text-destructive-frg',
		incomplete: 'bg-destructive text-destructive-frg',
		wating: 'bg-muted text-muted-frg',
		BEFORE: 'bg-muted text-muted-frg',
		IN_PROGRESS: 'bg-pending text-pending-frg',
		COMPLETED: 'bg-succes text-succes-frg',
	};
	const SIZE_MAP = {
		xs: 'px-1 py-1 text-xs min-h-5 rounded-xs',
		sm: 'px-2 py-1 text-sm min-h-7 rounded-sm',
		md: 'px-3 py-1 text-base min-h-9 rounded-md',
		lg: 'px-4 py-2 text-lg min-h-11 rounded-lg',
		xl: 'px-5 py-2 text-xl min-h-13 rounded-xl',
	} as const;
	let variantBgClasses = $derived(VARIANT_BG[variant]);
	let sizeClasses = $derived(SIZE_MAP[size ?? 'md']);
</script>

<p class={['inline-grid place-content-center text-center text-pretty break-all  transition-opacity duration-300', variantBgClasses, sizeClasses]}>
	{text}
</p>
