const alertModel = require("../models/alert");

module.exports = alertServices = {
    createAlert: (
        title,
        price,
        keyword,
        url,
        description,
    ) => {
        return new Promise((resolve, reject) => {
            const new_alert = new alertModel({
                title,
                price,
                keyword,
                url,
                description
            }).save();
            new_alert
                .then((alert) => {
                    resolve(alert);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
}