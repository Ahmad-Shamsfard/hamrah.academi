const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.get('/nameList', (req, res) => {
    const CHAT_FILE = path.join(__dirname, '../../chatData.json');
    let chatHistory = [];
    if (fs.existsSync(CHAT_FILE)) {
        const data = fs.readFileSync(CHAT_FILE);
        chatHistory = JSON.parse(data);
        listOfNames = []
        // console.log(chatHistory);
        // console.log(typeof(chatHistory));
        chatHistory.forEach(element => {
            console.log(element.username);

            listOfNames.push(element.username)
        });
        // filter duplicated
        listOfNames = listOfNames.filter((item,
            index) => listOfNames.indexOf(item) === index);

        res.status(200).send({
            namelist: listOfNames
        })
    } else {
        res.status(200).send({
            namelist: 'empty'
        })
    }
})




module.exports = router