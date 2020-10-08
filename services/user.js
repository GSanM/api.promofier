const userModel = require("../models/user");

module.exports = userServices = {
    createUser: (name, surname, email, username, password) => {
        return new Promise((resolve, reject) => {
            name = name.toLowerCase();
            surname = surname.toLowerCase();
            username = username.toLowerCase();
            email = email.toLowerCase();
    
            Promise.props({
                userWithEmail: userServices.getUserByEmail(email),
            })
            .then((info) => {
                if (info.userWithEmail != undefined) {
                    reject({
                        message: "Já existe um usuário cadastrado com este email!",
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

    getUsers: () => {
        return userModel.find({}).exec();
    },
}