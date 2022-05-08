//=======================================================
//
//  ##       #####    ####     ####    #####  #####
//  ##      ##   ##  ##       ##       ##     ##  ##
//  ##      ##   ##  ##  ###  ##  ###  #####  #####
//  ##      ##   ##  ##   ##  ##   ##  ##     ##  ##
//  ######   #####    ####     ####    #####  ##   ##
//
//=======================================================

// NOTE: Example: logger("{red}Hello World{reset}", { type: "error" });

import fs from 'fs'
import config from 'config'

const applicationConfig = config.get('application')

export const logger = (text, type) => {
	const isServer = JSON.parse(process.env.IS_ON_SERVER || 'false')
	const now = new Date()
	const date =
		now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2)
	const processId = global.process_id ?? (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16)

	const path = `${applicationConfig.logger.logFilePath}${date}/`

	isServer && !fs.existsSync(path) && fs.mkdirSync(path)

	const time =
		('0' + now.getHours()).slice(-2) +
		':' +
		('0' + now.getMinutes()).slice(-2) +
		':' +
		('0' + now.getSeconds()).slice(-2) +
		' ' +
		processId

	if (typeof text === 'object' || Array.isArray(text)) {
		text = JSON.stringify(text, null, 2)
	}

	const logText = text
		.replace(/{green}/g, '')
		.replace(/{blue}/g, '')
		.replace(/{yellow}/g, '')
		.replace(/{red}/g, '')
		.replace(/{reset}/g, '')

	text = text
		.replace(/{green}/g, '\u001b[32;1m')
		.replace(/{blue}/g, '\u001b[34;1m')
		.replace(/{yellow}/g, '\u001b[38;5;226m')
		.replace(/{red}/g, '\x1b[31m')
		.replace(/{reset}/g, '\x1b[0m')

	// ────────── SHOW LOG IF DATABASE LOG WAS DESABLE AND CONSOLE LOG WAS ENABLE ─────
	!applicationConfig.logger.logOnDatabase &&
		applicationConfig.logger.logOnConsole &&
		console.log('- ' + text + '\n')
	// ─────────────────────────────────────────────── START: SAVE LOG ON MONGODB ─────
	applicationConfig.logger.logOnDatabase &&
		(async () => {
			await global.mongo
				.collection(`${type}_logs`)
				.insertOne({
					text: logText,
					time: now.toUTCString(),
					process_id,
					path,
				})
				.then(() => {
					applicationConfig.logger.logOnConsole && console.log('- ' + text)
				})
				.catch((err) => console.log('Logger mongodb insert:', err.stack))
		})()
	// ────────────────────────────────────────────────────────────────────────────────
	applicationConfig.logger.logOnDatabase &&
		!['request'].includes(type) &&
		(async () => {
			await global.mongo
				.collection('all_logs')
				.insertOne({
					type,
					text: logText,
					time: now.toUTCString(),
					process_id,
					path,
				})
				.then(() => {
					applicationConfig.logger.logOnConsole && console.log('- ' + text)
				})
				.catch((err) => console.log('Logger mongodb insert:', err.stack))
		})()
	// ───────────────────────────────────────────────── END: SAVE LOG ON MONGODB ─────

	if (applicationConfig.logger.logOnFile && isServer) {
		fs.appendFile(path + type + '.log', `${date} ${time} ${text} \n`, (err) => console.log(err))

		!['request'].includes(type) &&
			fs.appendFile(path + 'all.log', `${date} ${time} ${text} \n`, (err) => console.log(err))
	}
}
