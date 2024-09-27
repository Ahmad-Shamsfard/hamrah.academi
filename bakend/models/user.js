let mongoose = require('mongoose')
let schema = mongoose.Schema
let bcrypt = require('bcrypt');

let userModel = new schema({
    name: {
        type: String,
        default: "Ahmad"
    },
    password: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

// userModel.pre('save', function (next) {
//     let user = this;
//     if (this.isModified('password')) {
//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) {
//                 console.log(err);
//                 return next(err)
//             } else {
//                 bcrypt.hash(user.password, salt, (err, hash) => {
//                     if (err) {
//                         console.log(err);
//                         return next(err)
//                     } else {
//                         user.password = hash
//                         next()
//                     }
//                 })
//             }
//         })
//     } else {
//         return next();
//     }
// })

// userModel.pre('findByIdAndUpdate', function (next) {
//     let user = this;
//     if (this.isModified('password')) {
//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) {
//                 console.log(err);
//                 return next(err)
//             } else {
//                 bcrypt.hash(user.password, salt, (err, hash) => {
//                     if (err) {
//                         console.log(err);
//                         return next(err)
//                     } else {
//                         user.password = hash
//                         next()
//                     }
//                 })
//             }
//         })
//     } else {
//         return next();
//     }
// })

// userModel.methods.comparePassword = function (pass, cb) {
//     console.log(pass);
//     bcrypt.compare(pass, this.password, (err, isMatch) => {
//         console.log(isMatch);
//         if (err) {
//             return cb(err)
//         } else {
//             return cb(null, isMatch)
//         }
//     })
// }

module.exports = mongoose.model('User', userModel)