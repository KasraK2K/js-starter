import BaseController from '../../classes/controller/BaseController'
import fs from 'fs'
import path from 'path'
import generalLogic from './logic'

class GeneralController extends BaseController {
	shakeHand(req, res) {
		return super.resGen({ req, res, result: true, data: [] })
	}

	async upload(req, res) {
		return await generalLogic
			.upload(req.body)
			.then((response) => super.resGen({ req, res, result: response.result, data: response.data }))
			.catch((err) =>
				super.resGen({
					req,
					res,
					status: err.code,
					result: err.result,
					error_code: err.error_code,
					error_user_messages: err.errors,
				})
			)
	}
}

export default new GeneralController()
