<script lang="ts">
	function initTmap() {
		const map = new Tmapv3.Map('map_div', {
			center: new Tmapv3.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
			width: '100%',
			height: '100%',
			zoom: 18,
		});
	}
</script>

<section id="map_div" {@attach initTmap} class="grid size-full"></section>
