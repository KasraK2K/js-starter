import BaseMiddleware from '../classes/middleware/BaseMiddleware'
import _ from 'lodash'
import formidable from 'formidable'
import BaseController from '../classes/controller/BaseController'
import config from 'config'
import { logger } from '../../common/helpers/logger'
import { uploadDirPath, removeUploaded } from '../../common/helpers/upload'
import { getError } from '../../common/helpers/errors'

const uploadConfig = config.get('upload')

class MultipartMiddleware extends BaseMiddleware {
	extendBody(req, res, next) {
		if ((req.headers['content-type'] ?? '').startsWith('multipart/form-data')) {
			const form = formidable({
				...uploadConfig,
				uploadDir: uploadDirPath(uploadConfig.uploadDir),
			})
			let checkUpload = { valid: true, errors: [] }

			/* ------------------------------ START: EVENTS ----------------------------- */
			form.on('error', (err) => {
				checkUpload.valid = false
				checkUpload.errors.push(getError(3017).message)
			})
			/* ------------------------------- END: EVENTS ------------------------------ */

			form.parse(req, (err, fields, files) => {
				if (err) {
					logger(`{red}Error on multipart header{reset}`, 'error')
					logger(`{red}${err.stack}{reset}`, 'error')
					checkUpload.valid = false
					checkUpload.errors.push(getError(3016).message)
				}

				if (typeof files === 'object' && !Array.isArray(files)) {
					const filesKeys = _.keys(files)

					filesKeys.forEach((fileKey) => {
						const file = files[fileKey]
						if (
							uploadConfig.validMimeTypes &&
							uploadConfig.validMimeTypes.length &&
							!uploadConfig.validMimeTypes.includes(String(file.mimetype))
						) {
							checkUpload.valid = false
							checkUpload.errors.push(getError(3018).message)
						}
					})

					if (!checkUpload.valid) {
						removeUploaded(files)
						logger(`{red}Error on uploading file{reset}`, 'error')
						return new BaseController().resGen({
							req,
							res,
							status: 400,
							result: false,
							error_code: 3017,
							error_user_messages: checkUpload.errors,
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
