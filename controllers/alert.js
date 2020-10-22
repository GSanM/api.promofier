const alertService = require("../services/alert");


module.exports = alertController = {

    //Create new alert, calling alertService
    createAlert: (req, res) => {
        let {
            user_id,
            title,
            price,
            price_gap,
            keyword,
            url,
            description
        } = req.body;
        
        alertService
            .createAlert(
                user_id,
                title,
                price,
                price_gap,
                keyword,
                url,
                description
            )
            .then((alert) => {
                res.json({
                    success: true,
                    message: "Alerta adicionado com sucesso!",
                    info: alert,
                });
            })
            .catch((e) => {
                console.log(e);
                res.json({
                    success: false,
                    message: e.message || "Ocorreu um erro interno",
                });
            });

    },
}