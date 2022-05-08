const map = new Map([
	[3000, 'Something went wrong'],
	[3001, 'Not Found'],
	[3002, 'Validation error'],
	[3003, 'This email is already registered'],
	[3004, 'Unauthenticated'],
	[3005, 'Method not allowed'],
	[3006, 'Too Many Requests'],
	[3007, 'Table not found'],
	[3008, 'Some uniques are not unique'],
	[3009, 'Database Connection Refused'],
	[3010, 'Column not found'],
	[3011, 'Invalid input value for enum'],
	[3012, 'Firebase error on sending message'],
	[3013, 'Error on sending email'],
	[3014, 'Data Not Found'],
	[3015, 'Constraint erro'],
])

export const getError = (code) => {
	return map.has(code) ? { code, message: map.get(code) } : { code, message: 'Error code not found' }
}
