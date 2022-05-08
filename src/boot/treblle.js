import { app } from './index'
import { useTreblle } from 'treblle'
import config from 'config'

const treblleConfig = config.get('application.monitoring.treblle')

useTreblle(app, {
	apiKey: treblleConfig.apiKey,
	projectId: treblleConfig.projectId,
})
