var router = express.Router();

const alertController = require("../controllers/alert");

router.post('/create', alertController.createAlert);

module.exports = router;