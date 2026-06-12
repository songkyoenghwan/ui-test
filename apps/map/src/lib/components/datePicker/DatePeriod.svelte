<svelte:options
	customElement={{
		tag: 'date-period',
		shadow: 'none',
		props: {
			inputId: { reflect: true, attribute: 'input-id' },
			placeholder: { reflect: true, attribute: 'input-placeholder' },
			selectedDate: { reflect: true, attribute: 'selected-date' },
			dateType: { reflect: true, attribute: 'date-type' },
			day: { reflect: true, attribute: 'day' },
			error: { reflect: true, type: 'Boolean', attribute: 'error' },
			inline: { reflect: true, attribute: 'inline' },
			position: { reflect: true, attribute: 'position' },
		},
	}}
/>

<script lang="ts">
	import flatpickr from 'flatpickr';
	import { Korean } from 'flatpickr/dist/l10n/ko.js';
	import type { Attachment } from 'svelte/attachments';

	let {
		inputId = '',
		placeholder = 'YYYY / MM / DD',
		selectedDate = $bindable(''),
		day = $bindable(''),
		dateType = 'default',
		error = false,
		inline = 'false',
		position = 'auto',
	} = $props();

	interface DatepickerConfig {
		dateType: 'default' | 'range' | string;
		inline: string;
	}

	let datepickerRef: HTMLInputElement | undefined = $state();

	const createButton = (label = '', className = '', dataLabel = '', onClick: () => void) => {
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.textContent = label;
		btn.className = className;
		btn.dataset.btn = dataLabel;
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			onClick();
		});
		return btn;
	};

	const handleFocus = () => {
		// 라이브러리가 팝업을 생성할 시간을 약간 주기 위해 setTimeout 사용
		setTimeout(() => {
			const dia = $host().querySelector('.flatpickr-calendar') as HTMLElement | null;
			if (dia) {
				dia.style.display = '';
				dia.style.position = 'fixed';
				dia.style.zIndex = '9999';

				// 현재 입력창 위치를 계산하여 fixed 위치 보정 (필요 시)
				const rect = datepickerRef?.getBoundingClientRect();
				dia.style.top = `${rect?.bottom || 0 + window.scrollY}px`;
			}
		}, 0);
	};

	const hiddenDialog = (dia: HTMLElement, inline: string, input: HTMLInputElement) => {
		if (dia && inline === 'true') {
			dia.style.display = 'none';
			input.focus();
		}
	};

	function normalizeDateText(value = '') {
		return value.replace(/\([^)]+\)/g, '').replace(/\s/g, '');
	}

	function getDefaultDate(value: string, dateType: string) {
		const normalized = normalizeDateText(value);

		if (!normalized) return undefined;

		if (dateType === 'range') {
			const [start, end] = normalized.split('~');
			if (start && end) {
				return [start, end];
			}
			return undefined;
		}

		return normalized;
	}

	let instance: flatpickr.Instance | null = $state(null);

	function flatpickrAttachment(config: DatepickerConfig): Attachment {
		return (element: Element) => {
			const input = element as HTMLInputElement;

			instance = flatpickr(input, {
				locale: Korean,
				mode: config.dateType === 'range' ? 'range' : 'single',
				inline: config.inline === 'true',
				position: 'auto', // 이제 타입이 완벽히 일치합니다.
				dateFormat: 'Y.m.d\\(D\\)',
				defaultDate: getDefaultDate(selectedDate, config.dateType),
				static: false,
				closeOnSelect: config.dateType === 'range',
				onReady: (selectedDates, dateStr, instance) => {
					const dia = $host().querySelector('.flatpickr-calendar') as HTMLElement;
					input.setAttribute('data-date', `${selectedDates}`);
					input.title = `${dateStr}`;

					const todayBtn = createButton('오늘', 'button m ghost mr-auto', 'date-picker-clear', () => {
						instance.setDate(new Date());
						instance.close();

						hiddenDialog(dia, config.inline, input);
					});

					// const clearBtn = createButton(
					// 	'초기화',
					// 	'p-2 text-sm bg-white border boder-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 mr-auto',
					// 	'date-picker-clear',
					// 	() => {
					// 		instance.clear();
					// 	},
					// );

					const cancelBtn = createButton('취소', 'button m secondary', 'date-picker-cancel', () => {
						instance.setDate(new Date());
						instance.close();

						hiddenDialog(dia, config.inline, input);
					});

					const confirmBtn = createButton('확인', 'button m primary', 'date-picker-confirm', () => {
						instance.close();

						hiddenDialog(dia, config.inline, input);
					});

					const btnWrapper = document.createElement('div');
					btnWrapper.className = 'flex justify-end gap-2 p-2 border-t mt-2';
					btnWrapper.append(todayBtn, cancelBtn, confirmBtn);
					instance.calendarContainer.appendChild(btnWrapper);

					if (datepickerRef) {
						const dia = $host().querySelector('.flatpickr-calendar') as HTMLElement | null;
						if (dia) {
							dia.style.display = 'none';
						}

						if (position === 'fixed') {
							datepickerRef.addEventListener('click', handleFocus);

							return () => {
								datepickerRef?.removeEventListener('click', handleFocus);
							};
						}
					}
				},
				onChange: (selectedDates, dateStr, inst) => {
					if (config.dateType === 'range' && selectedDates.length === 2) {
						const start = inst.formatDate(selectedDates[0], 'Y.m.d\\(D\\)');
						const end = inst.formatDate(selectedDates[1], 'Y.m.d\\(D\\)');
						day = `${start}~${end}`;
					} else {
						day = dateStr;
					}

					input.focus();
				},

				onClose: (selectedDates, dateStr, inst) => {
					input.title = day;
					input.setAttribute('data-date', day);

					error = day.trim() === '';
					input.focus();
				},
			});

			return () => {
				instance?.destroy();
				instance = null;
			};
		};
	}

	$effect(() => {
		if (!instance) return;
		const value = getDefaultDate(day || selectedDate, dateType);
		if (value) {
			instance.setDate(value, false);
		}
	});
</script>

<input
	{@attach flatpickrAttachment({ dateType, inline })}
	id={inputId}
	bind:this={datepickerRef}
	bind:value={day}
	class={['input-date m w-78.5 read-only:border-slate-300 read-only:bg-white', error ? 'error border-error! outline-error' : '']}
	{placeholder}
/>
