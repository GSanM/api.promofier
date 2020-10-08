const kabumSpider = require("../spiders/kabum");
const alertModel = require("../models/alert");

module.exports = kabumController = {

    shouldSend: async (req, res) => {

        var alert_from_db = await alertModel.findOne({"_id": req.body.alert});

        kabumSpider
            .getProduct(
                alert_from_db.url
            )
            .then((result) => {
                var result_price = result.price_cash.replace(/^\D+/g, '');
                result_price = result_price.replace(/\./g, '');
                result_price = parseFloat(result_price.replace(/\,/g, '.'));
                console.log(result_price, alert_from_db.price + alert_from_db.price_gap);

                if (result_price <= alert_from_db.price + alert_from_db.price_gap)
                {
                    const response = {
                        send: true,
                        message: "O produto que você queria está no preço desejado!",
                        title: result.title,
                        price: result.price,
                        price_cash: result.price_cash
                    };
                    res.json(response);
                }
                else
                {
                    const response = {
                        send: false
                    };
                    res.json(response);
                }
            })
            .catch((e) => {
                console.log(e);
                res.json({
                    success: false,
                    message: e.message || "Ocorreu um erro interno",
                });
            });         
    },

    getProduct: async (req, res) => {
        let {
            alert
        } = req.body;
        
        var alert_obj = await alertModel.findOne({"_id": alert})
        
        kabumSpider
            .getProduct(
                alert_obj.url
            )
            .then((result) => {
                var result_price = result.price_cash.replace(/^\D+/g, '');
                result_price = result_price.replace(/\./g, '');
                result_price = parseFloat(result_price.replace(/\,/g, '.'));
                console.log(result_price);

                const response = {
                    title: result.title,
                    price: result.price,
                    price_cash: result.price_cash,
                    price_gap: result.price_gap
                };
                res.json(response);
                return response;
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