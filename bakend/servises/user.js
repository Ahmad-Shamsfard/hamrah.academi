const userModel = require("../models/user");
let jwt = require('jsonwebtoken');
let secretKey = "hamrah"
let methods = {};
let privates = {
    tokenGenerator: function (id) {
        return jwt.sign({
            id: id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }
            , secretKey)
    }
};
methods.add = function ( fullName, password, callback) {
    userModel.findOne({ fullName: fullName }).lean().exec((err, user) => {
        // doctorModel.findOne({ phone: phoneNumber }, (err, doctor) => {
        if (err) {
            console.log(err);
            callback(500, err, false)
        } else {
            //age doctor bood
            if (user) {
                callback(401, "کاربر تکراری است!");
            }
            else {
                let newuser = new doctorModel({
                    fullName: fullName,
                    password: password
                })
                newuser.save((err) => {
                    if (err) {
                        callback(500, err, false)
                    } else {
                        console.log("new user added");
                        callback(null, null, false)
                    }
                })
            }
        }
    })

};


module.exports = methods