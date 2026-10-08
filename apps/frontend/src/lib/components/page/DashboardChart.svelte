<script lang="ts">
	type ChartRow = {
		label: string;
		picking: number;
		inspection: number;
	};

	let { kind, rows, height }: { kind: 'bar' | 'line'; rows: ChartRow[]; height: number } = $props();
	let canvas: HTMLCanvasElement;

	$effect(() => {
		const currentRows = rows;
		if (!canvas) return;

		let disposed = false;
		let chart: { destroy(): void } | undefined;

		void import('chart.js/auto').then(({ default: Chart }) => {
			if (disposed) return;

			const styles = getComputedStyle(canvas);
			const pickingColor = styles.getPropertyValue('--a72b2a').trim() || '#a72b2a';
			const inspectionColor = styles.getPropertyValue('--006ecc').trim() || '#006ecc';

			chart = new Chart(canvas, {
				type: kind,
				data: {
					labels: currentRows.map((row) => row.label),
					datasets: [
						{
							label: '피킹',
							data: currentRows.map((row) => row.picking),
							backgroundColor: pickingColor,
							borderColor: pickingColor,
							borderWidth: kind === 'line' ? 4 : 0,
							pointRadius: kind === 'line' ? 5 : 0,
							tension: 0.35,
						},
						{
							label: '검수',
							data: currentRows.map((row) => row.inspection),
							backgroundColor: inspectionColor,
							borderColor: inspectionColor,
							borderWidth: kind === 'line' ? 4 : 0,
							pointRadius: kind === 'line' ? 5 : 0,
							tension: 0.35,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					animation: { duration: 300 },
					plugins: { legend: { display: false } },
					scales: {
						x: { grid: { display: false }, border: { display: false } },
						y: { beginAtZero: true },
					},
				},
			});
		});

		return () => {
			disposed = true;
			chart?.destroy();
		};
	});
</script>

<div class="relative w-full" style:height="{height}px">
	<canvas bind:this={canvas} aria-label={kind === 'bar' ? '시간대별 처리량 차트' : 'UPH 추이 차트'}></canvas>
</div>
