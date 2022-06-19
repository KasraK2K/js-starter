import BaseMiddleware from '../classes/middleware/BaseMiddleware'
import _ from 'lodash'
import formidable from 'formidable'
import BaseController from '../classes/controller/BaseController'
import config from 'config'
import { logger } from '../../common/helpers/logger'
import os from 'os'
import fs from 'fs'
import { uploadDirPath, removeUploaded } from '../../common/helpers/upload'

const uploadConfig = config.get('upload')

class MultipartMiddleware extends BaseMiddleware {
	extendBody(req, res, next) {
		if ((req.headers['content-type'] ?? '').startsWith('multipart/form-data')) {
			const form = formidable({
				...uploadConfig,
				uploadDir: uploadDirPath(uploadConfig.uploadDir),
			})
			let checkUpload = { error: false, code: 3000 }

			/* ------------------------------ START: EVENTS ----------------------------- */
			form.on('error', (err) => (checkUpload = { error: true, code: 3017 }))
			/* ------------------------------- END: EVENTS ------------------------------ */

			form.parse(req, (err, fields, files) => {
				if (err) {
					logger(`{red}Error on multipart header{reset}`, 'error')
					logger(`{red}${err.stack}{reset}`, 'error')
					checkUpload = { error: true, code: 3016 }
				}

				if (typeof files === 'object' && !Array.isArray(files)) {
					const filesKeys = _.keys(files)

					filesKeys.forEach((fileKey) => {
						const file = files[fileKey]
						if (
							uploadConfig.validMimeTypes &&
							uploadConfig.validMimeTypes.length &&
							!uploadConfig.validMimeTypes.includes(String(file.mimetype))
						)
							checkUpload = { error: true, code: 3018 }
					})

					if (checkUpload.error) {
						removeUploaded(files)
						logger(`{red}Error on uploading file{reset}`, 'error')
						return new BaseController().resGen({
							req,
							res,
							status: 400,
							result: false,
							error_code: checkUpload.code,
						})
					}
				}

				_.assign(req.body, { fields })
				_.assign(req.body, { files })

				next()
			})
		} else next()
	}
}

export default new MultipartMiddleware()
