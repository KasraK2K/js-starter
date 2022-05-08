import Controller from './Controller'

class HomeController extends Controller {
	home(req, res) {
		res.json('Hello World!')
	}
}

export default new HomeController()
