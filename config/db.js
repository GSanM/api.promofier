const config = require("./config");

var urlDbpromofier = process.env.URLDB || config.db.promofier;

console.log("VERSAO::" + mongoose.version);

const connect = async () => {
      promofier = mongoose.createConnection(urlDbpromofier, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false,
         useUnifiedTopology: true
      });

   return {
      promofier
   }
}

module.exports = {
   connect
};