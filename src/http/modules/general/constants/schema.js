export const generalSchema = {
	//
	// ──────────────────────────────────────────────────────────────────────────────
	//   :::::: G E N E R A L   U P L O A D : :  :   :    :     :        :          :
	// ──────────────────────────────────────────────────────────────────────────────
	upload: {
		type: 'object',
		// additionalProperties: false, FIXME: uncomment this
		required: ['files', 'fields'],
		properties: {
			files: { type: 'object', minProperties: 1 },
			fields: { type: 'object' },
		},
	},
}

export default generalSchema
