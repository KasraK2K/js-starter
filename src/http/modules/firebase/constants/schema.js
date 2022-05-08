export const firebaseSchema = {
	// ──────────────────────────────────────────────────────────────────
	//   :::::: F I R E B A S E : :  :   :    :     :        :          :
	// ──────────────────────────────────────────────────────────────────
	sendMessage: {
		type: 'object',
		additionalProperties: false,
		required: ['id'],
		properties: {
			id: { type: 'string', format: 'id' },
			notification: {
				type: 'object',
				additionalProperties: false,
				required: ['title', 'body'],
				properties: {
					title: { type: 'string', minLength: 6, maxLength: 100 },
					body: { type: 'string', minLength: 10, maxLength: 255 },
					icon: { type: 'string', minLength: 6, maxLength: 255 },
					image: { type: 'string', minLength: 6, maxLength: 255 },
				},
			},
			data: { type: 'object' },
		},
	},
}

export default firebaseSchema
