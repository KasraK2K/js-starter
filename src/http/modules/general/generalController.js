import BaseController from '../../classes/controller/BaseController'

class GeneralController extends BaseController {
	shakeHand(req, res) {
		return super.resGen({ req, res, result: true, data: [] })
	}
}

export default new GeneralController()
