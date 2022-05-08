import Middleware from './Middleware'
import jwt from 'jsonwebtoken'
import Controller from '../controller/Controller'
import _ from 'lodash'
// import { logger } from '../common/logic/logger'

class RequestMiddleware extends Middleware {
	isPost(req, res, next) {
		const controller = new Controller()
		_.assign(res.locals, { params: { process_id: global.process_id } })

		logger(`{blue}[${req.method}]: ${req.originalUrl}{reset}`, 'request')

		const ignoreCheckMethod = ['swagger']
		const endpoint = req.originalUrl
		const checkToken = !ignoreCheckMethod.some((ignoreTkn) => endpoint.includes(ignoreTkn))

		if (req.method !== 'POST' && checkToken) {
			logger('{red}method is not POST{reset}', 'request')
			return controller.resGen({
				req,
				res,
				result: false,
				status: 405,
				error_code: 3005,
			})
		}
		next()
	}

	auth(req, res, next) {
		const controller = new Controller()
		const apiKeys = process.env.API_KEYS?.split(',') || []
		const ignoreApikeys = ['swagger']
		const ignoreToken = ['login', 'logout', 'shake-hand', 'swagger']
		const endpoint = req.originalUrl
		const params = req.body
		_.assign(res.locals.params, params)

		const checkApiKey = !ignoreApikeys.some((ignoreApiKey) => endpoint.includes(ignoreApiKey))
		const checkToken = !ignoreToken.some((ignoreTkn) => endpoint.includes(ignoreTkn))

		// ───────────────────────────────── IF PARAMS HAS NOT API KEY ─────
		if (checkApiKey && (!params.api_key || !apiKeys.includes(params.api_key))) {
			logger('{red}api_key is not verify{reset}', 'error')
			return controller.resGen({
				req,
				res,
				status: 401,
				result: false,
				error_code: 3004,
			})
		}

		if (checkToken) {
			const jwtPayload = RequestMiddleware.getJwtPayload(req)

			// ─────────────────────── IF JESON WEB TOKEN VARIFY HAS ERROR ─────
			if (!jwtPayload.result) {
				logger('{red}token is not verify{reset}', 'error')
				return controller.resGen({
					req,
					res,
					status: 401,
					result: false,
					error_code: 3004,
				})
			} else {
				_.assign(res.locals, { jwt_payload: jwtPayload.data })
				next()
			}
		} else {
			next()
		}
	}

	static getJwtPayload(req) {
		const token = req.headers.authorization ? req.headers.authorization.slice(7) : ''
		const returnValue = {}

		jwt.verify(token, process.env.JWT_SECRET ?? '', (err, decoded) => {
			if (err) returnValue.result = false
			else {
				returnValue.result = true
				returnValue.data = {}

				typeof decoded === 'object' && _.keys(decoded).length && _.assign(returnValue.data, decoded)
			}
		})

		return returnValue
	}
}

export default new RequestMiddleware()
