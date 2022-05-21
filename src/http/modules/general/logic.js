import BaseLogic from '../../classes/logic/BaseLogic'
import { logger } from '../../../common/helpers/logger'
import fs from 'fs'
import _ from 'lodash'
import formidable from 'formidable'
import config from 'config'
import { validator } from '../../validator'
import { generalSchema } from './constants/schema'
import { uploadDirPath, removeUploaded } from '../../../common/helpers/upload'

const uploadConfig = config.get('upload')

class GeneralLogic extends BaseLogic {
	upload(args) {
		return new Promise(async (resolve, reject) => {
			const { files, fields } = args
			const filesToResponse = {}
			const { valid, errors } = validator(generalSchema.upload, args)
			if (!valid) {
				removeUploaded(files)
				return reject({ result: false, error_code: 3002, errors: errors })
			} else {
				for (const fileKey in files) {
					/**
					 * NOTE:
					 * If you would like to change final destenation path you can write your own logic for `folderName` here
					 */
					const file = files[fileKey]
					const folderName = `uploads` // TODO: change folderName from 'uploads' to `uploads/${user.id}`
					const newFilename = file.originalFilename
					const oldPath = file.filepath
					const dirPath = `${uploadDirPath(uploadConfig.uploadDir)}/${folderName}`
					const filepath = `${dirPath}/${newFilename}`
					const responsePath = `${uploadConfig.responsePath}/${folderName}/${newFilename}`

					try {
						fs.mkdirSync(dirPath, { recursive: true })
						fs.renameSync(file.filepath, filepath)
					} catch (err) {
						logger(`{red}Error on create folder or rename file{reset}`, LoggerEnum.ERROR)
						logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR)
						return reject({ result: false, error_code: 3000 })
					}

					const newFile = _.assign(args.files[fileKey], {
						filepath: responsePath,
						newFilename,
						mtime: new Date().toISOString(),
					})

					filesToResponse[fileKey] = _.pick(newFile, [
						'lastModifiedDate',
						'filepath',
						'newFilename',
						'originalFilename',
						'mimetype',
						'size',
						'mtime',
					])
				}

				// TODO: If you like have data in database write your database logic here

				return resolve({ result: true, data: [filesToResponse] })
			}
		})
	}
}

export default new GeneralLogic()
