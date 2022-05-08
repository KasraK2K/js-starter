//==========================================================================
//
//  ##   ##    ###    #####    ##    ###    #####   ##      #####   ####
//  ##   ##   ## ##   ##  ##   ##   ## ##   ##  ##  ##      ##     ##
//  ##   ##  ##   ##  #####    ##  ##   ##  #####   ##      #####   ###
//   ## ##   #######  ##  ##   ##  #######  ##  ##  ##      ##        ##
//    ###    ##   ##  ##   ##  ##  ##   ##  #####   ######  #####  ####
//
//==========================================================================

import config from 'config'
import { logger } from '../common/helpers/logger'
import { mongoClient, pool } from '../boot'

const configs = config.util.toObject()

// ────────────────────────────────────────────────────────────────────────────────
//   :::::: L O C A L   V A R I A B L E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
export const locals = {
	application: {
		name: 'Hackaton Starter',
	},
}

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: G L O B A L   V A R I A B L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
export const globals = {
	service: {
		versions: {
			api: configs.application.api_version,
			front: configs.application.front_version,
			portal: configs.application.portal_version,
		},
	},
	mongo: {
		mongoClient,
		database: (databaseName) => mongoClient.db(databaseName ?? configs.database.mongodb.name),
		collection: (collectionName) =>
			mongoClient
				.db(configs.database.mongodb.name)
				.collection(collectionName ?? configs.database.mongodb.default_collection),
	},
	pg: { pool },
	logger,
}

export default {
	locals,
	globals,
}
