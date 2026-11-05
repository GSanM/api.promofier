# API Promofier

The idea behind the Promofier API is to use scrapers to monitor the prices of products sold on some websites, and to communicate with an app that will notify the user when a price is equal to or below the desired one.

### Getting started

To start the service, run the command below to install the required modules

```
npm install
```

Then run the command below to install nodemon globally, which is used to run the service

```
npm install -g nodemon
```

Then start the application with the command
 
```
npm start
```
NOTE: the service is configured for localhost, as are its MongoDB databases, so you need a MongoDB server installed locally, or you can reconfigure the database address in the config/config.js file.

### Endpoints

All API endpoints start with /api/v1

#### Create user

> POST localhost/api/v1/user/create

##### Body
```json
{
    "name": "John",
    "surname": "Doe",
    "email": "johndoe@gmail.com",
    "username": "johndoe",
    "password": "1234"
}
```

##### Responses 

###### HTTP 200

```json
{
    "success": true,
    "message": "Usuario criado com sucesso!"
}
```

###### HTTP 500
```json
{
    "success": false,
    "message": "Já existe um usuário cadastrado com este email!"
}
```

```json
{
    "success": false,
    "message": "Já existe um usuário cadastrado com este username!"
}
```

---

#### Create alert

> POST localhost/api/v1/alert/create

##### Body

```json
{
    "user_id": "5f91a40729e5441d444bac80",
    "title": "Processador", 
    "price": 2095,
    "price_gap": 5,
    "url": "https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=102436",
    "description": ""
}
```

##### Responses

###### HTTP 200
```json
{
    "success": true,
    "message": "Alerta adicionado com sucesso!",
    "info": {
        "_id": "5f91a43729e5441d444bac81",
        "user_id": "5f91a40729e5441d444bac80",
        "title": "Processador",
        "price": 2095,
        "price_gap": 5,
        "url": "https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=102436",
        "description": "",
        "createdAt": "2020-10-22T15:24:39.280Z",
        "updatedAt": "2020-10-22T15:24:39.280Z",
        "__v": 0
    }
}
```
###### HTTP 500

The failure case has not been implemented yet

---

#### Product data

Retrieves the product data, given the id of the created alert

> GET localhost/api/v1/kabum/product

##### Body

```json
{
    "alert": "5f91a43729e5441d444bac81"
}
```

##### Responses

###### HTTP 200

```json
{
    "title": "Processador AMD Ryzen 7 3700X 32MB 3.6GHz (4.4GHz Max Turbo) AM4, Sem Vídeo - 100-100000071BOX",
    "price": "R$ 2.552,82",
    "price_cash": "R$ 2.169,90"
}
```

###### HTTP 500

The failure case has not been implemented yet

---

#### Should I send a notification?

Compares the product price with the desired price, and responds based on that

> GET localhost/api/v1/kabum/shouldsend

##### Body

```json
{
    "alert": "5f91a43729e5441d444bac81"
}
```

##### Responses

###### HTTP 200

```json
{
    "send": false
}
```

###### HTTP 200

```json
{
    "send": true,
    "message": "O produto que você queria está no preço desejado!",
    "title": "Processador AMD Ryzen 7 3700X 32MB 3.6GHz (4.4GHz Max Turbo) AM4, Sem Vídeo - 100-100000071BOX",
    "price": "R$ 2.552,82",
    "price_cash": "R$ 2.169,90"
}
```

###### HTTP 500

The failure case has not been implemented yet

---
