//====================================================================
//
//  #####    #####    ####  ######   ####    #####    #####   ####
//  ##  ##  ##   ##  ##       ##    ##       ##  ##   ##     ##
//  #####   ##   ##   ###     ##    ##  ###  #####    #####   ###
//  ##      ##   ##     ##    ##    ##   ##  ##  ##   ##        ##
//  ##       #####   ####     ##     ####    ##   ##  #####  ####
//
//====================================================================

import pg from 'pg'
import config from 'config'

const pgConfig = config.get('database.postgres')

// ─────────────────────────────────────────────────────── POSTGRES MAIN POOL ─────
const pool = new pg.Pool({
	user: pgConfig.user,
	host: pgConfig.host,
	database: pgConfig.database,
	password: pgConfig.password,
	port: pgConfig.port,
	idleTimeoutMillis: pgConfig.idleTimeoutMillis,
	connectionTimeoutMillis: pgConfig.connectionTimeoutMillis,
	// ssl: {
	//   rejectUnauthorized: pgConfig.ssl.rejectUnauthorized,
	// },
})

pool
	.on('connect', () => console.log('Main postgres connected'))
	.on('remove', () => console.log('Main postgres connection closed'))
	.on('error', (err) => {
		console.error(err)
		process.exit(1)
	})

export default pool
