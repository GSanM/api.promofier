# API Promofier

A ideia da API promofier é utilizar de spiders/crawlers para monitorar preços de produtos vendidos em alguns sites da internet, para comunicação com um app que irá notificar caso o preço esteja igual ou abaixo do desejado.

### Iniciando

Para iniciar o serviço, basta executar o comando abaixo para instalar os módulos necessários

```
npm install
```

E o comando abaixo para rodar o serviço com o nodemon (instalando-o globalmente)

```
npm install -g nodemon
```

Em seguida, iniciar a aplicação através do comando
 
```
npm start
```
OBS: o serviço está configurado para localhost, assim como as suas bases no MongoDB, por isso, é necessário ter um servidor de MongoDB instalado localmente, ou reconfigurar o endereçamento da base, através do arquivo config/config.js.

### Endpoints

Todos os endpoints da API iniciam com /api/v1

#### Criar usuário

> POST localhost/api/v1/user/create

##### Body
```json
{
    "name": "Fulano",
    "surname": "de Tal",
    "email": "fulano@gmail.com",
    "username": "fulano",
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

#### Criar alerta

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

O caso de falha ainda não foi implementado

---

#### Dados do produto

Recupera dados do produto, passando o id do alerta criado

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
    "title": "Processador AMD Ryzen 7 3700X 32MB 3.6GHz (4.4GHz Max Turbo) AM4, Sem V�deo - 100-100000071BOX",
    "price": "R$ 2.552,82",
    "price_cash": "R$ 2.169,90"
}
```

###### HTTP 500

O caso de falha ainda não foi implementado

---

#### Devo enviar uma notificação?

Compara o preço do produto com o preço desejado, e responde baseado nisso

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
    "title": "Processador AMD Ryzen 7 3700X 32MB 3.6GHz (4.4GHz Max Turbo) AM4, Sem V�deo - 100-100000071BOX",
    "price": "R$ 2.552,82",
    "price_cash": "R$ 2.169,90"
}
```

###### HTTP 500

O caso de falha ainda não foi implementado

---