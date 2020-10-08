const alertService = require("../services/alert");


module.exports = alertController = {

    createAlert: (req, res) => {
        let {
            title,
            price,
            keyword,
            url,
            description
        } = req.body;
        
        alertService
            .createAlert(
                title,
                price,
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