import Ajv from 'ajv'
import addFormats from 'ajv-formats'
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export const validator = (schema, data) => {
	const errors = []
	const validate = ajv.compile(schema)
	const valid = validate(data)
	if (!valid) return { valid, errors: validate.errors }
	else return { valid }
}

export default validator
