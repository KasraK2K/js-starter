import config from 'config'
import Application from './src/Application'

const appConfig = config.get('application')
const server = new Application(appConfig.port)
server.start()

// ─── UNHANDLED REJECTION ────────────────────────────────────────────────────────
process.on('unhandledRejection', (reason, p) => {
	console.info('{red}Unhandled Rejection error{reset}')
	console.log('{red}Unhandled Rejection at: Promise %d Reson: %d{reset}', p, reason)
})

// ─── UNCAUGHT EXCEPTION ─────────────────────────────────────────────────────────
process.on('uncaughtException', (err) => {
	console.log('{red}Uncaught Exception error{reset}')
	console.log(`{red}${err.message}{reset}`)
	console.log(`{red}${err.message}{reset}`)
	process.exit(1)
})
