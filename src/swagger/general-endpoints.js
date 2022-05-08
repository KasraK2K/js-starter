export default {
	'/shake-hand': {
		post: {
			tags: ['GENERAL'],
			summary: 'Returns information about the server like version, name, etc.',
			description:
				'This api is created to get server information and to check if the server is running. no need to send authorization token but for security reason, you should send api key.',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							in: 'body',
							required: ['api_key'],
							properties: {
								api_key: {
									type: 'string',
									example: { $ref: '#/variables/api_key' },
								},
							},
						},
					},
				},
			},
			responses: {
				200: { description: 'OK' },
				401: { description: 'Unauthorized' },
			},
		},
	},
}
