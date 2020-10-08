var router = express.Router();

const kabumController = require("../controllers/kabum");

router.get('/shouldsend', kabumController.shouldSend);

module.exports = router;