const express = require('express');
const dbData = require('./firebase')
// const partialPath = path.join(__dirname, "/templates/partials");


const app = express()
app.use(express.urlencoded());
app.use(express.json());

var re = /(A|B|AB|O|a|b|ab|o)[+-]\s?[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/

let greetingMessages = ['hi', 'hello', 'hey', 'Hi', 'Hello', 'Hey', 'HI', 'HELLO', 'HEY'];
// let status = ["status", "form status"]


app.post('/reply', function (req, res) {
    console.log(req.body.message);
    // var message = req.body.message;
    if (greetingMessages.includes(req.body.message)) {
        res.json({
            reply: 'Namaste! \nWelcome to CoFight 👋 \nWe will help you to find plasma donors in your city. \n\nSimply type  message in following format  to get donor details👇 \n\nfor eg: *A+ Rajkot*\n \nOr you can also visit our website\n https://cofight.ravindrabosamiya.tech/ '
        });
    }
    else if (re.test(req.body.message)) {
        var message = req.body.message;
        console.log("message", message);
        var msgArray = message.split(' ');;
        var bloodGroup = msgArray[0].toLowerCase();
        var city = msgArray[1]
        city = makeItLowerCase(capital_letter(city))

        dbData.getData(city, bloodGroup).then((data) => {
            console.log("data", data);
            res.json({
                'reply': buildReply(data, city, bloodGroup)

            })
        }).catch((error) => {
            console.log("error", error)
            res.json({
                'reply': "No data found"

            })
        })


    }
    else {
        res.json({
            'reply': "sorry we did't get you please try again" + "\n\nSimply type  message in following format  to get donor details👇 \n\nfor eg: *A+ Rajkot*\n \n"

        })
    }


})


app.listen(process.env.PORT || 3000, () => {
    console.log("app is running on port");
})



function capital_letter(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

const makeItLowerCase = (str) => {
    var lowerCase = [str[0]]
    for (let i = 1; i < str.length; i++) {

        lowerCase.push(str[i].toLowerCase())


    }

    return (lowerCase.join(""))
}




const buildReply = (data, city, bloodGroup) => {
    var reply = "We found following data for blood group " + bloodGroup + " in " + city
        + "👇\n"
    data.forEach(doc => {
        reply = reply + "Name : " + doc.name + "\n" + "No:" + doc.mobileNo + "\n\n"
    });
    return reply;
}