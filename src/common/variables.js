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
import { logger } from '../common/logic/logger'

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
	logger,
}

export default {
	locals,
	globals,
}
