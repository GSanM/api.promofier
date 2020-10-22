const userModel = require("../models/user");

module.exports = userServices = {
    
    //Create a new user
    createUser: (name, surname, email, username, password) => {
        return new Promise((resolve, reject) => {
            name = name.toLowerCase();
            surname = surname.toLowerCase();
            username = username.toLowerCase();
            email = email.toLowerCase();
    
            Promise.props({
                userWithEmail: userServices.getUserByEmail(email),
                userWithUsername: userServices.getUserByUsername(username)
            })
            .then((info) => {
                //Search for duplicate user info
                if (info.userWithEmail != undefined) {
                    reject({
                        message: "Já existe um usuário cadastrado com este email!",
                    });
                }
                else if (info.userWithUsername != undefined) {
                    reject({
                        message: "Já existe um usuário cadastrado com este username!",
                    });
                }
                else {
                    const newUser = new userModel({
                        name,
                        surname,
                        email,
                        username,
                        password,
                    }).save();
                    newUser
                    .then((user) => {
                        resolve(user);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                reject(false);
            });
        });
    },

    //Get user passing email
    getUserByEmail: (email) => {
        if (email) {
            return userModel
            .findOne({
                email,
            })
            .exec();
        } else {
            return new Promise((resolve, reject) => {
                resolve(undefined);
            });
        }
    },

    getUserByUsername: (username) => {
        if (username) {
            return userModel
            .findOne({
                "username": username
            })
            .exec();
        } else {
            return new Promise((resolve, reject) => {
                resolve(undefined);
            });
        }
    },

    //Get a list of all users
    getUsers: () => {
        return userModel.find({}).exec();
    },
}