//=======================================================
//
//  #####     #####   ##   ##  ######  #####  #####
//  ##  ##   ##   ##  ##   ##    ##    ##     ##  ##
//  #####    ##   ##  ##   ##    ##    #####  #####
//  ##  ##   ##   ##  ##   ##    ##    ##     ##  ##
//  ##   ##   #####    #####     ##    #####  ##   ##
//
//=======================================================

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../swagger'
import starterConfig from '../../../starter.config'

const router = express.Router()
const { swagger } = starterConfig

// ────────────────────────────────────────────────────────────────────────
//   :::::: C O N T R O L L E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
import Controller from '../controller/Controller'
import generalController from '../controller/GeneralController'

// ────────────────────────────────────────────────────────────────────────
//   :::::: M I D D L E W A R E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
// import you routes middleware here
// ────────────────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────
//   :::::: R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
router.get('/shake-hand', generalController.shakeHand)

// swagger
swagger.enabled && router.use(swagger.endpoint, swaggerUi.serve, swaggerUi.setup(swaggerDocument, swagger.options))

// 404
router.use('*', (req, res) => {
	return new Controller().resGen({
		req,
		res,
		status: 404,
		result: false,
		error_code: 3001,
	})
})

export default router
