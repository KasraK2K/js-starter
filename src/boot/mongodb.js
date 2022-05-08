//======================================================================
//
//  ###    ###   #####   ##     ##   ####     #####   ####    #####
//  ## #  # ##  ##   ##  ####   ##  ##       ##   ##  ##  ##  ##  ##
//  ##  ##  ##  ##   ##  ##  ## ##  ##  ###  ##   ##  ##  ##  #####
//  ##      ##  ##   ##  ##    ###  ##   ##  ##   ##  ##  ##  ##  ##
//  ##      ##   #####   ##     ##   ####     #####   ####    #####
//
//======================================================================

import { MongoClient } from 'mongodb'
import config from 'config'

const mongodbConfig = config.get('database.mongodb')

const mongoClient = new MongoClient(mongodbConfig.uri)

mongoClient
	.on('connect', () => console.log('MongoDB connected'))
	.on('close', () => console.log('MongoDB connection closed'))
	.on('error', (err) => {
		console.error(err)
		process.exit(1)
	})

export default mongoClient
