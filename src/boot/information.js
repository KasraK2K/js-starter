if (process.env.NODE_ENV === 'development') {
	import('jsonwebtoken')
		.then(({ default: jwt }) => {
			const example_jwt_data = { user_id: 123 }
			const example_jwt_token = jwt.sign(example_jwt_data, process.env.JWT_SECRET ?? '', {
				expiresIn: '365d',
			})
			const api_keys = process.env.API_KEYS?.split(',')
			console.log({
				EXAMPLE_JWT_DATA: example_jwt_data,
				EXAMPLE_JWT_TOKEN: example_jwt_token,
				API_KEYS: api_keys,
				IS_ON_SERVER: JSON.parse(process.env.IS_ON_SERVER || 'false'),
			})
		})
		.catch((err) => console.log(`boot information error: ${err.message}`))
}
