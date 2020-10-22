request = require('request');
cheerio = require('cheerio');
fs      = require('fs');

module.exports = kabumSpider = {
    
    //Get product based on Kabum HTML structure
    getProduct: (
        url
    ) => {
        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if(err)
                    console.log('Error: ' + err);
                
                var $ = cheerio.load(body);
                var title  = $('div#titulo_det').find('h1.titulo_det').text().trim();
                
                var price = $('div.preco_desconto-cm').find('strong').text().trim();
                var price_cash = $('div.preco_normal-cm').find('span.preco_desconto_avista-cm').text().trim();
                
                if(price == '')
                {
                    price = $('div.preco_traco').find('div.preco_normal').text().trim();
                    price_cash = $('span.preco_desconto').find('strong').text().trim();
                }
                
                const res_body = {
                    "title": title,
                    "price": price,
                    "price_cash": price_cash
                };

                resolve(res_body);
            });
        })
        .catch((err) => {
            reject(err);
        });
    }
}