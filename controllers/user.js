const userService = require('../services/user');

module.exports = userController = {
    createUser: (req, res) => {
      let { name, surname, email, username, password } = req.body;
      userService.createUser(name, surname, email, username, password)
        .then((user) => {
          // var access_token = authServices.signAccessToken(user);
          // var refresh_token = authServices.signRefreshToken(user);
          res.status(200).json({
            success: true,
            message: "Usuario criado com sucesso!"
            // access_token: access_token,
            // refresh_token: refresh_token
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