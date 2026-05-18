<script lang="ts">
</script>

<div class="space-y-5 bg-white p-5">
	<div class="flex items-center gap-2">
		<label for="" class="label">M</label>
		<input type="text" name="" id="" class="input-text" placeholder="placeholder" />
		<label for="" class="label">S</label>
		<input type="text" name="" id="" class="input-text s" placeholder="placeholder" />
		<label for="" class="label">required</label>
		<input type="text" name="" id="" class="input-text" placeholder="placeholder" required />
		<label for="" class="label">disabled</label>
		<input type="text" name="" id="" class="input-text" placeholder="placeholder" disabled />
		<label for="" class="label">readonly</label>
		<input type="text" name="" id="" class="input-text" placeholder="placeholder" readonly />
	</div>
	<div class="flex items-center gap-2">
		<label for="" class="label">Date</label>
		<input type="date" name="" id="" class="input-date" placeholder="YYYY &#47; MM &#47; DD" />
		<input type="time" name="" id="" class="input-time" placeholder="YYYY &#47; MM &#47; DD" />
		<div class="input-search group/input-search">
			<input type="text" name="" id="" class="input-text peer" placeholder="YYYY &#47; MM &#47; DD" />
			<button type="button" class="button icon" data-btn="input-del">
				<span class="sr-only">del</span>
				<icon-list data-name="input-del" class="icon size-4 stroke-slate-400"></icon-list>
			</button>
		</div>
	</div>

	<div class="flex items-center gap-2">
		<label for="" class="label">M</label>
		<textarea name="" id="" class="input-text min-h-20" placeholder="placeholder"></textarea>
		<textarea name="" id="" class="input-text min-h-20" required></textarea>
		<textarea name="" id="" class="input-text min-h-20" disabled></textarea>
		<textarea name="" id="" class="input-text min-h-20" readonly></textarea>
	</div>

	<div class="flex items-center gap-2">
		<label for="" class="label">List</label>
		<div class="grid grid-cols-[1fr_100px] items-center gap-0.5">
			<input type="text" name="" id="" class="input-text" />
			<button type="button" class="button primary-outline flex-none">
				<span>자동번역</span>
				<icon-list data-name="translate" class="icon stroke-primary size-4"></icon-list>
			</button>
			<input type="text" name="" id="" class="input-text col-span-2" />
		</div>
	</div>

	<div class="flex items-center gap-2">
		button
		<button type="button" class="button primary">
			<span>button</span>
		</button>
		<button type="button" class="button s primary">
			<span>button</span>
		</button>
		<button type="button" class="button primary-outline">
			<span>button</span>
		</button>
		<button type="button" class="button primary-outline" disabled>
			<span>button</span>
		</button>
		<button type="button" class="button ghost">
			<span>button</span>
		</button>
		<button type="button" class="button text">
			<span>button</span>
		</button>
		<button type="button" class="button icon">
			<span class="sr-only">button</span>
			<icon-list data-name="translate" class="icon stroke-primary size-4"></icon-list>
		</button>
	</div>

	<section class="tab">
		<ul class="tab-list">
			<li class="tab-item group/tab-item">
				<label for="tab-1" class="tab-button">
					<input type="radio" id="tab-1" name="tab-1" class="peer sr-only" checked />
					<span class="text-">tab-1</span>
				</label>
			</li>
			<li class="tab-item group/tab-item">
				<label for="tab-2" class="tab-button">
					<input type="radio" id="tab-2" name="tab-1" class="peer sr-only" />
					<span class="text-">tab-2</span>
				</label>
			</li>
		</ul>
		<div class="tab-content">tab-1</div>
		<div class="tab-content">tab-1</div>
	</section>

	<div class="flex items-center gap-2">
		<label for="" class="label">List</label>
		<select name="" id="" class="select">
			<option value="">필터입니다.</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
		</select>
		<select name="" id="" class="select" required>
			<option value="">필터입니다.</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
		</select>
		<select name="" id="" class="select" disabled>
			<option value="">필터입니다.</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
			<option value="">옵션</option>
		</select>
	</div>

	<ol class="stepper">
		<li class="stepper-item group/stepper-item" data-step="completed">
			<p class="stepper-text">기본 정보</p>
		</li>
		<li class="stepper-item group/stepper-item" aria-current="step">
			<p class="stepper-text">상세 정보</p>
		</li>
		<li class="stepper-item group/stepper-item">
			<p class="stepper-text">운영 정보</p>
		</li>
		<li class="stepper-item group/stepper-item">
			<p class="stepper-text">연계 정보</p>
		</li>
	</ol>

	<ul class="inline-flex items-center gap-2">
		<li class="inline-flex items-center gap-2">
			<input type="radio" id="label-1" name="label-1" class="peer sr-only" checked />
			<label for="label-1" class="button s ghost min-w-15">
				<span>상시</span>
			</label>
		</li>
		<li class="inline-flex items-center gap-2">
			<input type="radio" id="label-2" name="label-1" class="peer sr-only" checked />
			<label for="label-2" class="button s ghost min-w-15">
				<span>기간</span>
			</label>
			<input type="text" name="" id="" class="input-date m hidden peer-checked:flex" placeholder="YYYY &#47; MM &#47; DD" />
		</li>
		<li class="inline-flex items-center gap-2">
			<input type="text" name="" id="" class="input-date m" placeholder="YYYY &#47; MM &#47; DD" />
			<span>~</span>
			<input type="text" name="" id="" class="input-date m" placeholder="YYYY &#47; MM &#47; DD" />
		</li>
	</ul>

	<div class="grid items-center gap-2">
		<ul class="inline-flex items-center gap-2">
			<li class="inline-flex items-center gap-2">
				<input type="radio" id="label-day-off-1" name="label-day-off-1" class="peer sr-only" checked />
				<label for="label-day-off-1" class="button s ghost min-w-15">
					<span>없음</span>
				</label>
			</li>
			<li class="inline-flex items-center gap-2">
				<input type="radio" id="label-day-off-2" name="label-day-off-1" class="peer sr-only" checked />
				<label for="label-day-off-2" class="button s ghost min-w-15">
					<span>매달 휴무</span>
				</label>
			</li>
		</ul>

		<dl class="inline-flex items-center gap-1">
			<dt class="label">주차</dt>
			<dd>
				<input type="checkbox" id="label-week-1" name="label-week-1" class="peer sr-only" />
				<label for="label-week-1" class="button s ghost min-w-12.5">
					<span>첫째</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-week-2" name="label-week-2" class="peer sr-only" />
				<label for="label-week-2" class="button s ghost min-w-12.5">
					<span>둘째</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-week-3" name="label-week-3" class="peer sr-only" />
				<label for="label-week-3" class="button s ghost min-w-12.5">
					<span>셋째</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-week-4" name="label-week-4" class="peer sr-only" />
				<label for="label-week-4" class="button s ghost min-w-12.5">
					<span>넷째</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-week-5" name="label-week-5" class="peer sr-only" />
				<label for="label-week-5" class="button s ghost min-w-12.5">
					<span>마지막</span>
				</label>
			</dd>
		</dl>

		<dl class="inline-flex items-center gap-1">
			<dt class="label">요일</dt>
			<dd>
				<input type="checkbox" id="label-day-1" name="label-day-1" class="peer sr-only" />
				<label for="label-day-1" class="button s ghost size-7">
					<span>월</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-day-2" name="label-day-2" class="peer sr-only" />
				<label for="label-day-2" class="button s ghost size-7">
					<span>화</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-day-3" name="label-day-3" class="peer sr-only" />
				<label for="label-day-3" class="button s ghost size-7">
					<span>수</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-day-4" name="label-day-4" class="peer sr-only" />
				<label for="label-day-4" class="button s ghost size-7">
					<span>목</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-day-5" name="label-day-5" class="peer sr-only" />
				<label for="label-day-5" class="button s ghost size-7">
					<span>금</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-day-6" name="label-day-6" class="peer sr-only" />
				<label for="label-day-6" class="button s ghost size-7">
					<span>토</span>
				</label>
			</dd>
			<dd>
				<input type="checkbox" id="label-day-7" name="label-day-7" class="peer sr-only" />
				<label for="label-day-7" class="button s ghost size-7">
					<span>일</span>
				</label>
			</dd>
		</dl>

		<p class="text-error text-sm">주차와 요일을 각각 1개 이상 선택해 주세요.</p>
	</div>

	<div class="grid items-center gap-2">
		<ul class="inline-flex items-center gap-2">
			<li class="inline-flex items-center gap-2">
				<input type="radio" id="label-day-every-1" name="label-day-every-1" class="peer sr-only" checked />
				<label for="label-day-every-1" class="button s ghost min-w-15">
					<span>매일</span>
				</label>
			</li>
			<li class="inline-flex items-center gap-2">
				<input type="radio" id="label-day-every-2" name="label-day-every-1" class="peer sr-only" checked />
				<label for="label-day-every-2" class="button s ghost min-w-15">
					<span>요일별</span>
				</label>
			</li>
		</ul>

		<div class="inline-flex items-center gap-2">
			<input type="time" name="" id="" class="input-time m" placeholder="시간 선택" />
			<span>~</span>
			<input type="time" name="" id="" class="input-time m" placeholder="시간 선택" />

			<li class="inline-flex items-center gap-2">
				<input type="radio" id="label-time-every-1" name="label-time-every-1" class="peer sr-only" checked />
				<label for="label-time-every-1" class="button s ghost min-w-15">
					<span>요일별</span>
				</label>
			</li>
		</div>

		<div class="grid items-center gap-2">
			<section class="space-y-7.5 rounded-sm bg-white p-5 shadow-2xs">
				<h4 class="text-121212 text-xl font-semibold">
					작성 중인 내용이 저장되지 않았습니다.
					<br />
					이 페이지를 벗어나시겠습니까?
				</h4>

				<div class="flex items-center justify-end gap-2">
					<button type="button" class="button ghost basis-20">
						<span>취소</span>
					</button>
					<button type="button" class="button primary basis-20">
						<span>확인</span>
					</button>
				</div>
			</section>

			<div>
				<section class="group/top-tip inline-flex min-h-12 items-center gap-1 rounded-sm bg-white shadow-2xs">
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
						<icon-list
							data-name="arrow-left"
							class="icon relative size-5 rotate-180 stroke-slate-400 transition-transform group-has-checked/top-tip:rotate-0"
						></icon-list>
						<input type="checkbox" id="top-label-1" name="top-label-1" class="peer sr-only" />
						<span class="relative hidden group-has-checked/top-tip:flex">접기</span>
					</label>
				</section>

				<section
					class="group/toast bg-primary grid translate-y-0 items-center gap-1 rounded-md pl-1 opacity-100 shadow-2xs transition-all transition-discrete starting:translate-y-5 starting:opacity-0"
				>
					<div
						class="rounded-l-4 flex h-full min-h-12 items-center gap-2 rounded-l-sm bg-white px-4 py-1 opacity-100 transition-opacity transition-discrete starting:opacity-0"
					>
						<h4 class="text-121212 text-base">저장되었습니다.</h4>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>
