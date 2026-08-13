export interface LoginBody {
	loginAccount: string;
	password: string;
}

export interface CreateSampleUserBody {
	loginAccount: string;
	password: string;
	name?: string;
	email?: string;
}

export interface AuthUserResponse {
	id: number;
	name: string | null;
	email: string | null;
	loginAccount: string | null;
	/** 대상지 목록  */
	tourDestinations: AuthTourDestinationResponse[];
	/** 유저 메뉴 목록  */
	menus: AuthMenuResponse[];
}

export interface AuthTourDestinationResponse {
	id: number;
	name: unknown;
	sortingNumber: number | null;
	sectionCongestion: boolean;
}

export interface AuthTourDestinationAccessResponse {
	tourDestinationId: number;
	lastAccessedAt: Date;
}

export type AuthMenuRequiredFeature = 'sectionCongestion';

export interface AuthMenuPermissionsResponse {
	/** 메뉴 조회 권한 */
	read: boolean;
	/** 메뉴 생성 권한 */
	create: boolean;
	/** 메뉴 수정 권한 */
	update: boolean;
	/** 메뉴 삭제 권한 */
	delete: boolean;
}

export interface AuthMenuBaseResponse {
	id: number;
	code: string | null;
	name: string | null;
	/** 메뉴 URL */
	url: string | null;
	sortingNumber: number | null;
	/** 동적으로 처리할 메뉴명 */
	requiredFeature: AuthMenuRequiredFeature | null;
	/** 메뉴 권한 (추후 개발예정)*/
	permissions: AuthMenuPermissionsResponse;
}

export type AuthMenuChildResponse = AuthMenuBaseResponse;

export interface AuthMenuResponse extends AuthMenuBaseResponse {
	children: AuthMenuChildResponse[];
}

export type JwtTokenType = 'access' | 'refresh';

export interface JwtTokenPayload {
	type: JwtTokenType;
	jti: string;
	userId: number;
	loginAccount: string;
}

export type JwtAccessTokenPayload = JwtTokenPayload & { type: 'access' };

export type JwtRefreshTokenPayload = JwtTokenPayload & { type: 'refresh' };

export interface LoginResponse {
	csrfToken?: string;
	user: AuthUserResponse;
}

export type RefreshTokenResponse = LoginResponse;

export interface IssuedAuthTokens extends LoginResponse {
	accessToken: string;
	refreshToken: string;
	refreshTokenJti: string;
}

export interface CsrfTokenResponse {
	csrfToken: string;
}
