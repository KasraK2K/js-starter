import './boot'
import { app, express } from './boot'
import _ from 'lodash'
import { locals, globals } from './common/variables'
import config from 'config'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimiterMiddleware from './http/middlewares/rateLimiterMiddleware'
import requestMiddleware from './http/middlewares/requestMiddleware'
import router from './http/routes'

const corsConfig = config.get('cors')

class Application {
	constructor(port) {
		this.port = port

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
		app.use(requestMiddleware.processIdAdder)
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
