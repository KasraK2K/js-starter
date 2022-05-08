import _ from 'lodash'
import config from 'config'
import { getError } from '../../common/logic/errors'
import { logger } from '../../common/logic/logger'

const applicationConfig = config.get('application')
const mode = config.get('mode')

class Controller {
	logger() {
		console.log('Log from BaseController')
	}

	resGen(args) {
		const { res, status } = args
		const generatedStatus = Controller.statusGen(status)
		logger(`{green}${JSON.stringify(_.omit(res.locals.params, ['process_id']), null, 2)}{reset}`, 'request')

		return args.result
			? res.status(generatedStatus).json(Controller.responseGenerator(args))
			: res.status(generatedStatus).json(Controller.errorGenerator(args))
	}

	static responseGenerator(options) {
		const { req, result, data } = options
		const response = {
			process_id: global.process_id,
			api_version: applicationConfig.api_version,
			front_version: applicationConfig.front_version,
			portal_vertion: applicationConfig.portal_version,
			endpoint: req.originalUrl,
			env: process.env.NODE_ENV,
			mode,
			result,
			data: Array.isArray(data) ? data : [data],
		}
		logger(_.omit(response, 'data'), 'request')
		return response
	}

	static errorGenerator(options) {
		const { req, result, error_code, error_user_messages } = options
		const error = getError(error_code ?? 3000)
		const response = {
			process_id: global.process_id,
			api_version: applicationConfig.api_version,
			front_version: applicationConfig.front_version,
			portal_vertion: applicationConfig.portal_version,
			endpoint: req.originalUrl,
			env: process.env.NODE_ENV,
			mode,
			result,
			error_code: error.code,
			error_message: error.message,
			error_user_messages,
		}
		logger(response, 'request')
		return response
	}

	static statusGen(status = null) {
		if (!status) return 200
		const newStatus = typeof status === 'string' ? parseInt(status) : status
		if (newStatus >= 100 && newStatus < 600) return newStatus
		return 500
	}
}

export default Controller