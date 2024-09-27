var express = require('express');
var router = express.Router();
var userService= require("../../servises/user")

router.post('/add', (req, res) => {

    console.log(req)
    if ( typeof req.body.fullName === "undefined" || req.body.fullName.length === 0 ) {
        res.status(400).send({
            success: false,
            error: "لطفا فیلد های مورد نظر را صحیح  وکامل پر کنید"
        })
    }
    else {
            userService.add( req.body.fullName, req.body.password, (errcode, errtext) => {
                if (errcode) {
                    res.status(errcode).send({
                        success: false,
                        err: errtext,
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        text: "کاربر جدید اضافه شد"
                    })
                }
            })
    }
})



module.exports = router