var router = express.Router();

const userController = require("../controllers/user");

router.post('/create', userController.createUser);

module.exports = router;