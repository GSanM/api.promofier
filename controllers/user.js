const userService = require('../services/user');

module.exports = userController = {

  //Create a new user
  createUser: (req, res) => {
    let { name, surname, email, username, password } = req.body;
    userService.createUser(name, surname, email, username, password)
      .then((user) => {
        res.status(200).json({
          success: true,
          message: "Usuario criado com sucesso!"
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          success: false,
          message: e.message || "Ocorreu um erro interno",
        });
      });
  },

  //Get a list of all users
  getUsers: (req, res) => {
    userService.getUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          success: false,
          message: e.message || "Ocorreu um erro interno",
        });
      });
  }
};