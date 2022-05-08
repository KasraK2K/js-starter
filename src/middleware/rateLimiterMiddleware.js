import Middleware from './Middleware'
import rateLimit from 'express-rate-limit'
import Controller from '../controller/Controller'
import config from 'config'

const reateLimiterConfig = config.get('rate_limiter')

class RateLimiterMiddleware extends Middleware {
	constructor(controller) {
		super()
		this.controller = controller
	}

	check() {
		return rateLimit({
			windowMs: reateLimiterConfig.windowMs, // 1 minutes
			max: reateLimiterConfig.max, // limit each IP to 100 requests per 1 minutes
			standardHeaders: reateLimiterConfig.standardHeaders, // Return rate limit info in the `RateLimit-*` headers
			legacyHeaders: reateLimiterConfig.legacyHeaders, // Disable the `X-RateLimit-*` headers
			handler: (req, res) => {
				this.controller.resGen({
					req,
					res,
					result: false,
					status: 429,
					error_code: 3006,
				})
			},
		})
	}
}

export default new RateLimiterMiddleware(new Controller())
