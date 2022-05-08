import bcrypt from 'bcryptjs'

export const saltGen = (saltNum = 7) => {
	return bcrypt.genSaltSync(saltNum)
}

export const hashGen = (text, salt = null) => {
	let generatedSalt

	switch (typeof salt) {
		case 'string':
			generatedSalt = salt
			break

		case 'number':
			generatedSalt = saltGen(salt)
			break

		default:
			generatedSalt = saltGen()
	}

	return bcrypt.hashSync(text, generatedSalt)
}

export const compareHash = (text, hash) => {
	return bcrypt.compareSync(text, hash)
}

export default { saltGen, hashGen, compareHash }
