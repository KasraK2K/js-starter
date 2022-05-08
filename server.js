import config from 'config'
import Application from './src/Application'
import { logger } from './src/common/logic/logger'

const appConfig = config.get('application')
const server = new Application(appConfig.port)
server.start()

// ─── UNHANDLED REJECTION ────────────────────────────────────────────────────────
process.on('unhandledRejection', (reason, p) => {
	logger('{red}Unhandled Rejection error{reset}', 'info')
	logger(`{red}Unhandled Rejection at: Promise ${p} Reson: ${reason}{reset}`, 'error')
})

// ─── UNCAUGHT EXCEPTION ─────────────────────────────────────────────────────────
process.on('uncaughtException', (err) => {
	logger('{red}Uncaught Exception error{reset}', 'info')
	logger(`{red}${err.message}{reset}`, 'error')
	logger(`{red}${err.message}{reset}`, 'error')
	process.exit(1)
})
