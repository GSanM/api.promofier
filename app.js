
//Imports

express = require("express");
mongoose = require("mongoose");
config = require("./config/config");
Promise = require("bluebird");
var bodyParser = require("body-parser");
const database = require("./config/db");

//================

environment = process.env.ENV_BASE || config.env;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set("port", process.env.PORT || 3000);

database
    .connect()
    .then(() => {
        //If is the main module
        if (!module.parent) {
            const server = app.listen(app.get("port"), function () {
                console.log("Servidor ligado porta " + app.get("port"));
            });
            server.timeout = 45000;
        }

        app.use(function (req, res, next) {
            res.status(404);

            // Respond with html page
            if (req.accepts("html")) {
                res.send("Not found");
                return;
            }

            // Respond with json
            if (req.accepts("json")) {
                res.send({
                    error: "Not found",
                });
                return;
            }

            // Default to plain-text. send()
            res.type("txt").send("Not found");
        });
    })
    .catch((e) => {
        console.log(e);
        Sentry.captureException(e);
    });

var routes = require("./routes/routes.js");
app.use("/api/v1", routes);

module.exports = app;