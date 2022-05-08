import './boot'
import { app, express } from './boot'
import _ from 'lodash'
import { locals, globals } from './common/variables'
import config from 'config'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimiterMiddleware from './http/middleware/rateLimiterMiddleware'
import requestMiddleware from './http/middleware/requestMiddleware'
import router from './http/router'

const corsConfig = config.get('cors')

class Application {
	constructor(port) {
		this.port = port

		const process_id = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16)
		_.assign(global, { process_id })

		this.config()
		this.middlewares()
		this.routes()
	}

	config() {
		app.locals = locals
		_.assign(global, globals)
		app.set('port', process.env.PORT || this.port)
	}

	middlewares() {
		app.use(express.json())
		app.use(express.urlencoded({ extended: false }))
		app.use(helmet())
		app.use(compression())
		app.disable('x-powered-by')
		app.use(
			cors({
				optionsSuccessStatus: 200,
				methods: corsConfig.allow_method,
				origin: corsConfig.allow_origin,
			})
		)
		app.use(rateLimiterMiddleware.check())
		// app.use(requestMiddleware.isPost)
		// app.use(requestMiddleware.auth)
	}

	routes() {
		app.use('/', router)
	}

	start() {
		app.listen(app.get('port'), () => console.log(`listening on http://localhost:${app.get('port')}`))
	}
}

export default Application
