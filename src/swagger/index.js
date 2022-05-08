import config from 'config'
import general from './general-endpoints'

const configs = config.util.toObject()

export default {
	openapi: '3.0.n',
	info: {
		title: 'Node Starter',
		description: 'This is a node.js starter pack to create service easy and fast',
		version: configs.application.api_version,
	},
	servers: [
		{
			url: process.env.IS_ON_SERVER ? 'https://api.mng.dev.embargoapp.com' : 'http://localhost:8000',
			description: 'Manager API',
		},
	],

	// ────────────────────────────────────────────────────────────────────
	//   :::::: E N D P O I N T S : :  :   :    :     :        :          :
	// ────────────────────────────────────────────────────────────────────
	paths: {
		'/shake-hand': general['/shake-hand'],
	},

	variables: {
		api_key:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb3VyY2UiOiJtbmciLCJpYXQiOjE2NDM0MDM5NjV9.TDXx-pdtzEqMxaXRGXtk6MZkmgOILvQpYplzvCCwP3k',
	},

	components: {
		securitySchemes: {
			bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
		},
	},
	// now for each endpoint authorize with token copy this code: security: [{ bearerAuth: [] }],
}
