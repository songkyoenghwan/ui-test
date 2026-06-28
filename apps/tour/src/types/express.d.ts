import type { JwtAccessTokenPayload } from './auth';

declare global {
	namespace Express {
		interface Request {
			user?: JwtAccessTokenPayload;
		}
	}
}
