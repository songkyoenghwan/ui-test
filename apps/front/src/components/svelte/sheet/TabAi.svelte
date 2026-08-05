<script lang="ts">
	let tab = $state('ai-recommend');
</script>

<div class="px-6 py-1">
	<div class="*:text-cente grid grid-cols-2 rounded-lg bg-slate-100 p-1 *:min-h-8">
		<label
			for="ai-recommend"
			class="flex items-center justify-center rounded-lg bg-slate-100 text-black has-checked:bg-white"
		>
			<input type="radio" bind:group={tab} value="ai-recommend" id="ai-recommend" class="peer sr-only" />
			AI 추천
		</label>
		<label for="popularity" class="flex items-center justify-center rounded-lg bg-slate-100 text-black has-checked:bg-white">
			<input type="radio" bind:group={tab} value="popularity" id="popularity" class="peer sr-only" />
			인기
		</label>
	</div>
</div>

<p class="flex items-center gap-1.5 p-5">$키워드 영역$가 많이 찾는 시설이에요</p>
