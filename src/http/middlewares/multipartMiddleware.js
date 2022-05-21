import BaseMiddleware from '../classes/middleware/BaseMiddleware'
import _ from 'lodash'
import formidable from 'formidable'
import BaseController from '../classes/controller/BaseController'
import config from 'config'
import { logger } from '../../common/helpers/logger'
import os from 'os'
import fs from 'fs'
import path from 'path'

const uploadConfig = config.get('upload')

class MultipartMiddleware extends BaseMiddleware {
	extendBody(req, res, next) {
		if ((req.headers['content-type'] ?? '').startsWith('multipart/form-data')) {
			const form = formidable({
				...uploadConfig,
				uploadDir: MultipartMiddleware.uploadDirGen(uploadConfig.uploadDir),
			})

			form.parse(req, (err, fields, files) => {
				if (err) {
					logger(`{red}Error on extending multipart header{reset}`, 'error')
					logger(`{red}${err.stack}{reset}`, 'error')
					return new BaseController().resGen({
						req,
						res,
						status: 500,
						result: false,
						error_code: 3016,
						error_user_messages: err,
					})
				}

				if (typeof files === 'object' && !Array.isArray(files)) {
					const filesKeys = _.keys(files)
					let error = false

					filesKeys.forEach((fileKey) => {
						const file = files[fileKey]
						if (
							uploadConfig.validMimeTypes &&
							uploadConfig.validMimeTypes.length &&
							!uploadConfig.validMimeTypes.includes(String(file.mimetype))
						) {
							error = true
						}
					})

					if (error) {
						filesKeys.forEach((fileKey) => {
							const file = files[fileKey]
							fs.unlinkSync(file.filepath)
						})
						logger(`{red}Error on uploading file{reset}`, 'error')
						return new BaseController().resGen({
							req,
							res,
							status: 400,
							result: false,
							error_code: 3017,
						})
					}
				}

				_.assign(req.body, { fields })
				_.assign(req.body, { files })

				next()
			})
		} else next()
	}

	static uploadDirGen(configPath) {
		if (configPath === 'tmp') return os.tmpdir()
		else if (configPath === 'statics') return path.resolve(process.cwd(), './src/statics')
		else return configPath
	}
}

export default new MultipartMiddleware()
