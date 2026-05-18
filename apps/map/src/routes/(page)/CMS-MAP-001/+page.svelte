<script lang="ts">
	import { onMount } from 'svelte';

	function initTmap() {
		const map = new Tmapv3.Map('map_div', {
			httpsMode: true,
			mapType: 'PUBLIC',
			center: new Tmapv3.LatLng(37.52762856785255, 126.96883232235822), // 지도 초기 좌표
			width: '100%',
			height: '100%',
			zoom: 18,
			zoomControl: true,
			scrollwheel: true,
			draggable: true,
		});
	}

	function MapType(type) {
		if ('HYBRID' == type) {
			map.setMapType('HYBRID');
		} else if ('ROAD' == type) {
			map.setMapType('ROAD');
		} else if ('PUBLIC' == type) {
			map.setMapType('PUBLIC');
		} else if ('NIGHT' == type) {
			map.setMapType('NIGHT');
		}
	}

	onMount(async () => {
		const mapListEl = document.querySelector('map-list');
		const mapRegEl = document.querySelector('map-reg');

		if (!mapListEl || !('list' in mapListEl)) return;

		// 예: 서버에서 데이터를 가져오거나, 일부러 async 처리
		const dataPromise = await new Promise((resolve) => {
			const items = Array.from({ length: 500 }, (_, i) => ({
				id: `poi_${i}`,
				tit: i === 0 ? '' : `LS 용산타워 LS 용산타워 LS 용산타워 LS 용산타워 ${i}`,
				poi: `PoI${(i % 100) + 1}`,
				place:
					i === 0
						? 0
						: i === 1
							? []
							: [
									{ tit: '터키 아이스크림', top: '식당·카페', bottom: '푸드 트럭', category: 'food' },
									{ tit: '어딘가에 위치한 화장실어딘가에 위치한 화장실', top: '상위', bottom: '하위', category: 'toilet' },
									{ tit: '안내소', top: '안내', bottom: '안내소', category: 'toilet' },
								],
				exposure: i === 0 ? false : true,
			}));
			resolve(items);
		});

		mapListEl.list = dataPromise;

		mapListEl.addEventListener('btn-click', (e) => {
			console.log('btn-click detail:', e.detail);
		});

		mapRegEl.place = dataPromise[2].place;
	});
</script>

<section class="group/top-tip absolute top-5 left-5 z-5 inline-flex min-h-12 items-center gap-1 rounded-sm bg-white shadow-2xs">
	<div class="flex items-center gap-2 py-1 pl-4">
		<icon-list data-name="info-circle" class="icon fill-primary size-5"></icon-list>
		<h4 class="text-121212 hidden text-base font-semibold opacity-100 transition-opacity transition-discrete group-has-checked/top-tip:flex starting:opacity-0">
			지도를 우클릭하여 위치 변경
		</h4>
	</div>
	<label
		for="top-label-1"
		class="icon hover:bg-primary/20 inline-flex h-full min-h-[stretch] min-w-15 flex-[0_0_50px] items-center justify-center rounded-r-sm px-1 text-base text-slate-400 group-has-checked/top-tip:flex-[0_0_80px]"
	>
		<icon-list data-name="arrow-left" class="icon relative size-5 rotate-180 stroke-slate-400 transition-transform group-has-checked/top-tip:rotate-0"></icon-list>
		<input type="checkbox" id="top-label-1" name="top-label-1" class="peer sr-only" />
		<span class="relative hidden group-has-checked/top-tip:flex">접기</span>
	</label>
</section>

<section id="map_div" {@attach initTmap} class="grid size-full"></section>

<section class="map-list">
	<header class="map-list__header">
		<div class="flex items-end justify-between gap-1">
			<h3 class="font-bold">위치 목록</h3>
			<div class="flex-none">
				<p class="flex-1 text-slate-500">
					<strong class="font-bold">302</strong>
					<span>개</span>
				</p>
			</div>
		</div>
		<div class="grid grid-cols-9 gap-2">
			<select name="" id="" class="select col-span-5" title="content:">
				<option value="">전체 카테고리</option>
				<option value="">옵션</option>
			</select>
			<select name="" id="" class="select col-span-4">
				<option value="">노출 + 비노출</option>
				<option value="">옵션</option>
			</select>
		</div>
		<div class="input-search group/input-search">
			<input type="text" name="" id="" class="input-text peer" placeholder="위치 검색" />
			<button type="button" class="button icon" data-btn="input-del">
				<span class="sr-only">del</span>
				<icon-list data-name="input-del" class="icon size-4 stroke-slate-400"></icon-list>
			</button>
		</div>
	</header>
	<div class="map-list-body">
		<div class="flex items-end justify-between gap-1 px-5">
			<select name="" id="" class="select w-30">
				<option value="">최신순</option>
				<option value="">가나다순</option>
			</select>
			<div class="flex-none">
				<p class="flex-1 text-slate-500">
					<span>검색결과</span>
					<strong class="text-primary font-bold">300</strong>
				</p>
			</div>
		</div>

		<map-list class="flex min-h-0 flex-1 flex-col"></map-list>
	</div>
</section>

<map-reg class="map-reg"></map-reg>

<!-- <section class="map-reg z-20">
	<header class="map-reg__header">
		<div class="flex items-end justify-between gap-1">
			<h3 class="text-lg font-semibold">위치 등록</h3>
			<div class="flex-none">
				<p class="flex-1 text-slate-500">
					<strong class="font-bold">302</strong>
					<span>개</span>
				</p>
			</div>
		</div>
	</header>
	<div class="map-reg__top group/map-lang">
		<div class="hidden flex-col space-y-2 group-has-checked/map-lang:flex">
			<div class="flex items-end justify-between gap-1">
				<h4 class="text-base font-semibold">위치명</h4>
				<div class="flex-none">
					<p class="flex-1 text-slate-600">POI 000</p>
				</div>
			</div>
			<ul class="flex flex-col gap-2">
				<li class="grid grid-cols-[28px_1fr_80px] items-center gap-1">
					<label for="" class="label text-primary">KO</label>
					<input type="text" name="" id="" class="input-text s outline-primary outline" placeholder="내용을 입력하세요." />
					<button type="button" class="button primary-outline s flex-none">
						<span>자동번역</span>
						<icon-list data-name="translate" class="icon stroke-primary size-4"></icon-list>
					</button>
				</li>
				<li class="grid grid-cols-[28px_1fr] items-center gap-0.5">
					<label for="" class="label">EN</label>
					<input type="text" name="" id="" class="input-text s" placeholder="영어로 입력해 주세요." />
				</li>
			</ul>
			<div class="flex items-center gap-2">
				<button type="button" class="button primary-outline s flex-1">
					<span>다국어 입력</span>
				</button>
			</div>
			<ul class="flex flex-col gap-2 pt-2">
				<li class="grid grid-cols-[22px_1fr_22px_1fr] items-center gap-2">
					<label for="" class="label">위도</label>
					<input type="text" name="" id="" class="input-text s" placeholder="위도를 입력하세요." />
					<label for="" class="label">경도</label>
					<input type="text" name="" id="" class="input-text s" placeholder="경도를 입력하세요." />
				</li>
				<li class="grid grid-cols-[22px_1fr] items-center gap-2">
					<label for="" class="label">주소</label>
					<input type="text" name="" id="" class="input-text s" placeholder="주소" readonly value="주소" />
				</li>
			</ul>
		</div>

		<label for="map-reg-top-1" class="icon hover:bg-primary/20 inline-flex h-7 flex-none items-center justify-end gap-2 rounded-r-sm px-1 text-slate-400">
			<icon-list data-name="arrow-down" class="icon relative size-4 h-12 rotate-0 stroke-slate-400 transition-transform group-has-checked/map-lang:rotate-180"></icon-list>
			<input type="checkbox" id="map-reg-top-1" name="map-reg-top-1" class="peer sr-only" checked />
			<span class="relative hidden text-sm group-has-checked/map-lang:flex">접기</span>
			<span class="relative flex text-sm group-has-checked/map-lang:hidden">펼치기</span>
		</label>
	</div>
	<div class="map-reg-body">
		<div class="flex items-end justify-between gap-1 px-5">
			<select name="" id="" class="select w-30">
				<option value="">최신순</option>
				<option value="">가나다순</option>
			</select>
			<div class="flex-none">
				<p class="flex-1 text-slate-500">
					<span>검색결과</span>
					<strong class="text-primary font-bold">POI 000</strong>
				</p>
			</div>
		</div>

		<map-lis class="flex min-h-0 flex-1 flex-col"></map-lis>
	</div>
	<footer></footer>
</section> -->
