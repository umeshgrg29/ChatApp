console.log("Hello this is my chat app")
const fs = require('fs')
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/login', (req, res, next) => {
    res.send(`<form onsubmit='localStorage.setItem("username", document.getElementById("username").value)' action='/' method='GET'><input id="username" type="text" name ="username"><button type="submit">add</button></form>`)
    res.redirect('/')
})

app.get('/', (req, res, next) => {

    fs.readFile('username.txt', (err, data)=>{
        if(err)
        {
            console.log(err);
            data = 'No chat exists'
        }
        res.send(`${data}<h1>Welcome to my chat app</h1>
    <form action = "/" method = "POST" onsubmit = 'document.getElementById("username").value = localStorage.getItem("username")'>
    <input type="hidden" name = "username" id="username" >
    <input type="text" name = "message" placeholder="Enter your message" id="message">
    <button type="submit">send</button>
    </form>`)
    })
    
})

app.post('/',(req,res,next)=>{
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt", `${req.body.username}:${req.body.message}`,{flag: 'a'}, (err)=>{
        err ? console.log(err) : res.redirect('/')
    })
    
})


app.listen(3000);