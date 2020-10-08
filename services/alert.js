const alertModel = require("../models/alert");

module.exports = alertServices = {
    createAlert: (
        user_id,
        title,
        price,
        price_gap,
        keyword,
        url,
        description,
    ) => {
        return new Promise((resolve, reject) => {
            const new_alert = new alertModel({
                user_id,
                title,
                price,
                price_gap,
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