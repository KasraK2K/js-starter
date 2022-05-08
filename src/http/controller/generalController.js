import Controller from './Controller'

class GeneralController extends Controller {
	shakeHand(req, res) {
		return super.resGen({ req, res, result: true, data: [] })
	}
}

export default new GeneralController()
