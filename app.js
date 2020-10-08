
//Imports

express = require("express");
mongoose = require("mongoose");
config = require("./config/config");
socketIO = require("socket.io");
//Promise = require("bluebird");
var bodyParser = require("body-parser");
const database = require("./config/db");

//================

environment = process.env.ENV_BASE || config.env;

var cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

environment = process.env.ENV_BASE || config.env;

app.use(
    bodyParser.json({
        limit: "1mb",
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "1mb",
        extended: true,
    })
);
app.use(cors());

app.use(express.static(__dirname + "/"));

app.set("port", process.env.PORT || 3000);

database
    .connect()
    .then(() => {
        if (!module.parent) {
            const server = app.listen(app.get("port"), function () {
                console.log("servidor ligado porta " + app.get("port"));
            });
            server.timeout = 45000;

            io = socketIO(server, {
                pingInterval: 15000,
                pingTimeout: 30000,
            });
            // console.log(config.db);
            // io.adapter(mongoAdapter(config.db.socket));
        }

        app.use(function (req, res, next) {
            res.status(404);

            // respond with html page
            if (req.accepts("html")) {
                res.send("Not found");
                return;
            }

            // respond with json
            if (req.accepts("json")) {
                res.send({
                    error: "Not found",
                });
                return;
            }

            // default to plain-text. send()
            res.type("txt").send("Not found");
        });
    })
    .catch((e) => {
        console.log(e);
        Sentry.captureException(e);
    });

var alertRoutes = require("./routes/alert.js");
app.use("/alert", alertRoutes);

var kabumRoutes = require("./routes/kabum.js");
app.use("/kabum", kabumRoutes);

// var noAuthRoutes = require("./routes/noauth/routes.js");
// app.use("/noauth", noAuthRoutes);

module.exports = app;