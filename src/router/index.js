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
import swaggerDocument from '../swagger'
import starterConfig from '../../starter.config'

const router = express.Router()
const { swagger } = starterConfig

// ────────────────────────────────────────────────────────────────────────
//   :::::: C O N T R O L L E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
import homeController from '../controller/homeController'

// ────────────────────────────────────────────────────────────────────────
//   :::::: M I D D L E W A R E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
// import you routes middleware here
// ────────────────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────
//   :::::: R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
router.get('/', homeController.home)

// swagger
swagger.enabled && router.use(swagger.endpoint, swaggerUi.serve, swaggerUi.setup(swaggerDocument, swagger.options))

// 404
router.use('*', (req, res) => {
	return new BaseController().resGen({
		req,
		res,
		status: 404,
		result: false,
		error_code: 3001,
	})
})

export default router
