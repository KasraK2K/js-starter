import express from 'express'
import homeController from './gateway/homeController'

// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
const app = express()

class Application {
	constructor(port) {
		this.port = port

		this.config()
		this.middlewares()
		this.routes()
	}

	config() {
		app.set('port', process.env.PORT || this.port)
	}

	middlewares() {
		app.use(express.json())
		app.use(express.urlencoded({ extended: false }))
	}

	routes() {
		app.get('/', homeController.home)
	}

	start() {
		app.listen(app.get('port'), () => console.log(`listening on http://localhost:${app.get('port')}`))
	}
}

export default Application
