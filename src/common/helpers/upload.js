import fs from 'fs'
import path from 'path'
import _ from 'lodash'

export const uploadDirPath = (configPath) => {
	if (configPath === 'tmp') return os.tmpdir()
	else if (configPath === 'statics') return path.resolve(process.cwd(), './src/statics')
	else return configPath
}

export const removeUploaded = (files) => {
	const filesKeys = _.keys(files)
	filesKeys.forEach((fileKey) => {
		const file = files[fileKey]
		fs.unlinkSync(file.filepath)
	})
}

export default { uploadDirPath, removeUploaded }
