<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';

	import 'dayjs/locale/ko';

	dayjs.extend(utc);
	dayjs.locale('ko');

	let {
		dateTime = '',
		timeView = false,
	}: {
		dateTime?: string;
		timeView?: boolean;
	} = $props();

	const DAY_LABELS: Record<number, string> = {
		0: m.usr_map_002_26({ locale: $langState }),
		1: m.usr_map_002_20({ locale: $langState }),
		2: m.usr_map_002_21({ locale: $langState }),
		3: m.usr_map_002_22({ locale: $langState }),
		4: m.usr_map_002_23({ locale: $langState }),
		5: m.usr_map_002_24({ locale: $langState }),
		6: m.usr_map_002_25({ locale: $langState }),
	};

	function formatDate(value?: string) {
		if (!value) return '';

		const d = dayjs.utc(value);
		if (!d.isValid()) return value;

		const day = DAY_LABELS[d.day()];

		return timeView ? `${d.format('YY.MM.DD')}(${day}) ${d.format('HH:mm')}` : `${d.format('YY.MM.DD')}(${day})`;
	}
</script>

{formatDate(dateTime)}
