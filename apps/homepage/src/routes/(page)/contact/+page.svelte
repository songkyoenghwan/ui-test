<main class="sub">
	<sub-heading-line title="Contact"></sub-heading-line>

	<address-section></address-section>

	<section data-scroll="first" class="first opacity-100">
		<form id="form" class="form-list w-full space-y-7.5 lg:space-y-15" data-scoll-x="form">
			<div class="w-full overflow-hidden rounded-xl bg-white p-5 lg:p-15">
				<div class="flex w-full items-center overflow-x-auto sm:overflow-auto">
					<div class="itmes-cehter inline-flex w-full flex-none gap-5 sm:flex-wrap">
						<label for="tabRdo1" class="label-check flex-none place-items-center rounded-full">
							<input type="radio" name="tabRdo1" id="tabRdo1" class="peer sr-only" checked />
							<strong class="text-lg font-bold lg:text-2xl">제품 데모 문의</strong>
						</label>
						<label for="tabRdo2" class="label-check flex-none place-items-center rounded-full">
							<input type="radio" name="tabRdo1" id="tabRdo2" class="peer sr-only" checked />
							<strong class="text-lg font-bold lg:text-2xl">제품 문의</strong>
						</label>
						<label for="tabRdo3" class="label-check flex-none place-items-center rounded-full">
							<input type="radio" name="tabRdo1" id="tabRdo3" class="peer sr-only" checked />
							<strong class="text-lg font-bold lg:text-2xl">사업/협력 문의</strong>
						</label>
						<label for="tabRdo4" class="label-check flex-none place-items-center rounded-full">
							<input type="radio" name="tabRdo1" id="tabRdo4" class="peer sr-only" checked />
							<strong class="text-lg font-bold lg:text-2xl">기타 문의</strong>
						</label>
					</div>
				</div>

				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactTitle">
							문의 제목
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<input class="input-text" id="contactTitle" type="text" placeholder="문의 제목을 입력해 주세요." title="문의 제목을 입력해 주세요." />
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="inquiryRoute">
							문의 경로
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<select class="select" id="inquiryRoute" name="" title="문의 경로를 선택해 주세요.">
							<option class="option">문의 경로를 선택해 주세요.</option>
							<option class="option">검색엔진</option>
							<option class="option">SNS</option>
							<option class="option">온라인 기사 또는 보도자료</option>
							<option class="option">전시회·세미나</option>
							<option class="option">딥파인 홈페이지·블로그</option>
							<option class="option">고객사·파트너 추천</option>
							<option class="option">딥파인 뉴스레터·이메일</option>
						</select>
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactTextarea">
							문의 내용
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<div class="form-area">
							<textarea class="textarea" id="contactTextarea" name="" placeholder="문의 내용을 입력해 주세요." title="문의 내용을 입력해 주세요."></textarea>
						</div>
					</dd>
				</dl>
				<p class="text-000 bg-light-blue mt-5 rounded-xl p-5 lg:mt-7.5 lg:p-7.5">
					DEEP.FINE은 XR 공간 구축 솔루션 DSC, 스마트글라스 기반 원격 협업 솔루션 DAO, AI 기반 물류 자동화를 지원하는 DSL을 통해 산업 현장의 운영과 협업 방식을
					개선합니다. <br />
					데모 신청 시, 귀사의 산업과 적용 환경을 기반으로 적합한 솔루션 구성 및 활용 시나리오에 대한 후속 논의를 진행하며, 이메일 협의를 통해 상세 내용을 안내하고 계정을 발급해드립니다.
				</p>
				<dl class="form-item">
					<dt class="form-tit">
						<p class="label">
							관심 솔루션
							<sup class="text-red">*</sup>
						</p>
					</dt>
					<dd class="form-content grid gap-2.5 lg:grid-cols-3 lg:gap-5">
						<label for="solutionRdo1" class="label-check">
							<input type="checkbox" name="solutionRdo1" id="solutionRdo1" class="peer sr-only" checked />
							<strong class="text-2md font-bold lg:text-lg">DSC</strong>
							<span class="text-2md text-666 peer-checked:text-white/70 lg:text-lg">AR 기반 공간 정보 플랫폼</span>
						</label>
						<label for="solutionRdo2" class="label-check">
							<input type="checkbox" name="solutionRdo2" id="solutionRdo2" class="peer sr-only" />
							<strong class="text-2md font-bold lg:text-lg">DSC</strong>
							<span class="text-2md text-666 peer-checked:text-white/70 lg:text-lg">스마트글라스 기반 원격 협업 솔루션</span>
						</label>
						<label for="solutionRdo3" class="label-check">
							<input type="checkbox" name="solutionRdo3" id="solutionRdo3" class="peer sr-only" />
							<strong class="text-2md font-bold lg:text-lg">DSL</strong>
							<span class="text-2md text-666 peer-checked:text-white/70 lg:text-lg">AI 기반 물류 피킹 및 포장 솔루션</span>
						</label>
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactSelect03">
							적용하고자 하는 산업군
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content space-y-5">
						<select class="select" id="contactSelect03" name="" title="산업군을 선택하세요.">
							<option class="option">조선·중공업</option>
							<option class="option">제조·공정</option>
							<option class="option">건설·SOC</option>
							<option class="option">에너지·플랜트</option>
							<option class="option">제약·바이오</option>
							<option class="option">팝업·전시·갤러리</option>
							<option class="option">박물관·문화시설</option>
							<option class="option">관광·지역 축제</option>
							<option class="option">유통·리테일 매장</option>
							<option class="option">공공기관·오피스</option>
							<option class="option">부동산·공간 투어</option>
							<option class="option">스마트시티·인프라</option>
							<option class="option">직접입력하기</option>
						</select>
						<input class="input-text" id="contactTitle" type="text" placeholder="산업군을 직접 입력해 주세요." title="산업군을 직접 입력해 주세요." />
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactSelect04">
							적용하고자 하는 산업군
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content space-y-5">
						<select class="select" id="contactSelect04" name="" title="산업군을 선택하세요.">
							<option class="option">사업장 사이즈를 선택하세요.</option>
							<option class="option">소형 (10인 이하)</option>
							<option class="option">중형 (11~100인 이하)</option>
							<option class="option">대형 (100인 이상)</option>
						</select>
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactFirstName">
							성
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<input class="input-text" id="contactFirstName" type="text" placeholder="성을 입력해 주세요." title="성을 입력해 주세요." />
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactLastName">
							이름
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<input class="input-text" id="contactLastName" type="text" placeholder="이름을 입력해 주세요." title="이름을 입력해 주세요." />
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactCorpName">
							기업(기관)명
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<input class="input-text" id="contactCorpName" type="text" placeholder="기업 또는 기관명을 입력해 주세요." title="기업 또는 기관명을 입력해 주세요." />
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="label" for="contactPosition">부서 · 직책</label>
					</dt>
					<dd class="form-content">
						<input class="input-text" id="contactPosition" type="text" placeholder="부서와 직책을 입력해 주세요." title="부서와 직책을 입력해 주세요." />
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="form-content__label label input-email__label" for="contactTel">
							전화번호
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<input class="input-text" id="contactTel" type="email" placeholder="이메일을 입력해 주세요." title="이메일을 입력해 주세요." />
					</dd>
				</dl>
				<dl class="form-item">
					<dt class="form-tit">
						<label class="form-content__label label input-email__label" for="contactEmail">
							이메일
							<sup class="text-red">*</sup>
						</label>
					</dt>
					<dd class="form-content">
						<input class="input-text" id="contactEmail" type="email" placeholder="이메일을 입력해 주세요." title="이메일을 입력해 주세요." />
					</dd>
				</dl>

				<div class="border-t-d9d9d9 border-t-dashed flex items-center gap-5 border-t pt-5 lg:pt-15">
					<label class="label" for="contactCheckbox">
						<input class="checkbox size-9 rounded-lg lg:size-15" id="contactCheckbox" type="checkbox" />
					</label>
					<a href="" title="개인정보보호정책 페이지로 이동하기" aria-label="개인정보보호정책 페이지로 이동하기">
						<span class="text-primary text-2md underline lg:text-2xl">개인정보보호정책</span>
						<span class="text-2md lg:text-2xl">에 동의합니다.</span>
						<span class="text-2md lg:text-2xl">(필수)</span>
					</a>
				</div>
			</div>

			<div class="flex w-full items-center justify-center lg:inline-flex">
				<button
					type="submit"
					class="bg-primary hover:text-primary hover:border-primary group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md px-5 font-bold text-white hover:border hover:bg-white lg:flex-none"
				>
					<span>문의하기</span>
					<icon-list name="tick-circle" class="group-hover:fill-primary size-6 fill-white"></icon-list>
				</button>
			</div>
		</form>
	</section>
</main>
