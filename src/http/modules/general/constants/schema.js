export const firebaseSchema = {
	//
	// ──────────────────────────────────────────────────────────────────────────────
	//   :::::: G E N E R A L   U P L O A D : :  :   :    :     :        :          :
	// ──────────────────────────────────────────────────────────────────────────────
	upload: {
		type: 'object',
		additionalProperties: true,
		required: ['id'],
		properties: {
			files: { type: 'object' },
			fields: { type: 'object' },
		},
	},
}

export default firebaseSchema
