var router = express.Router();

var alertRoutes = require("./alert");
router.use("/alert", alertRoutes);

var kabumRoutes = require("./kabum");
router.use("/kabum", kabumRoutes);

var userRoutes = require("./user");
router.use("/user", userRoutes);

module.exports = router;