<script>
	import { updateViewState } from '@/stores/uxStore';
</script>

<div class="fixed top-1/5 left-0 grid gap-2">
	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'default',
				detail: 'ai',
				search: 'default',
			});
		}}
	>
		ai
	</button>
	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'facilities',
				detail: 'facilities',
				search: 'idle',
			});
		}}
	>
		poi
	</button>
	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'search',
				detail: 'idle',
				search: 'search',
			});
		}}
	>
		최근 검색 (default)
	</button>

	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'search',
				detail: 'search',
				search: 'searchResult',
			});
		}}
	>
		검색 결과 (default 반확장)
	</button>

	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'directions',
				detail: 'idle',
				search: 'departure',
			});
		}}
	>
		출발지/도착지 선택
	</button>
	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'search',
				detail: 'idle',
				search: 'departureSearch',
			});
		}}
	>
		길 안내 검색
	</button>
	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'directions',
				detail: 'path',
				search: 'path',
			});
		}}
	>
		길 안내 시작
	</button>
	<button
		type="button"
		onclick={() => {
			updateViewState({
				layout: 'directions',
				detail: 'directions',
				search: 'idle',
			});
		}}
	>
		경로탐색
	</button>
</div>
