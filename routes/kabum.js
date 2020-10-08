var router = express.Router();

const kabumController = require("../controllers/kabum");

router.get('/shouldsend', kabumController.shouldSend);
router.get('/product', kabumController.getProduct);

module.exports = router;