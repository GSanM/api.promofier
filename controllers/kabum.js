const kabumSpider = require("../spiders/kabum");


module.exports = alertController = {

    shouldSend: (req, res) => {
        let {
            url,
            price
        } = req.body;
        
        kabumSpider
            .shouldSend(
                url
            )
            .then((result) => {
                console.log(price);
                var result_price = result.price_cash.replace(/^\D+/g, '');
                result_price = parseFloat(result_price.replace(/\,/g, '.'));
                console.log(result_price);
                if (result_price <= price)
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
}