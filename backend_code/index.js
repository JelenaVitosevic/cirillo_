require('dotenv').config()

const Joi = require('joi');
const { joiPassword } = require('joi-password');

const express = require('express');
const app = express();

app.use(express.json());

const { createHash } = require('crypto');
function hash(string) {
    return createHash('sha256').update(string).digest('hex');
  }

let jwt = require("jsonwebtoken");

const users = [];

const loginUsers = [];

app.get('/', (req, res) => {
    res.send('Jecin API')
})

app.get('/register', (req, res) => {
    res.send(users);
})


//HTTP POST REGISTER REQUEST  
app.post('/register', (req, res) => {

    let errorMessage = ''
    
    let checkedUserEmail = users.find(user => {
        if (req.body.email === user.email) {
            return user
        }
        else return null
    })
    if(checkedUserEmail) {
        errorMessage = "User with this email already exist!";
    }
    else errorMessage = ""

    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: joiPassword
                    .string()
                    .minOfSpecialCharacters(1)
                    .minOfLowercase(1)
                    .minOfUppercase(1)
                    .minOfNumeric(1)
                    .noWhiteSpaces()
                    .required(),
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    else if (errorMessage) {
        res.status(400).send(errorMessage)
    }
    else {
        const user = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash(req.body.password),
        tasks: []
    }
    users.push(user)
    res.status(201).send(user)
    } 
    })


//HTTP POST LOGIN REQUEST    
app.post('/login', (req, res) => {

    const schema = Joi.object({
        email: Joi.required(),
        password: joiPassword.required(),
    })

    const result = schema.validate(req.body);
    if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return;
    }

    /*const loginUser = {
        email: req.body.email,
        password: req.body.password
    }*/

    let checkedUser = users.find(user => {
        if (req.body.email === user.email) {
            return user
        }
        else return null
    })

    if(checkedUser) {
        if (hash(req.body.password) === checkedUser.password) {
            
            var token = jwt.sign({
                id: checkedUser.id
            }, process.env.API_SECRET, {
                expiresIn: 86400
            })
            console.log('TOKEN=' + token )
            res.status(200).send({
                checkedUser: {
                    id: checkedUser.id,
                    email: checkedUser.email,
                },
                message: 'Welcome ' + checkedUser.firstName + ' ' + checkedUser.lastName + '!' +' You are loged in!',
                accessToken: token,
            })
            checkedUser.TOKEN = token
            loginUsers.push(checkedUser)
            console.log(loginUsers)
        }
        else {
            console.log('NO TOKEN FOR YOU!')
            res.status(401).send({
                accessToken: null,
                message: 'You entered incorect password! Try again!'
            })
        }
    }
    else {
        res.status(401).send('You entered incorect email! Try again!')
    } 
})


//HTTP POST TASK REQUEST    
app.post('/tasks', (req, res) => {
    
    const schema = Joi.object({
        name: Joi.string().required(),
        time: Joi.number().required(),
        status: Joi.required(),
        userEmail: Joi.required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const userEmail = req.body.userEmail;

    const task = {
        name: req.body.name,
        time: req.body.time,
        status: req.body.status
    }

    let checkedUser = users.find(user => {
        if (userEmail === user.email) {
            return user
        }
        else return null
    })

    if(checkedUser) {
        if (loginUsers.includes(checkedUser)) {
            task.id = checkedUser.tasks.length + 1;
            checkedUser.tasks.push(task)
            res.status(201).send(users)
        }
        else {
            res.status(401).send('You must be logged in to add tasks!')
        }
    } 
    else {
        res.status(401).send('The user with the email you entered was not found!')
    }    
})


//HTTP GET TASK REQUEST 
app.get('/tasks/:email/:password/:id', (req, res) => {

    let requestedTask = loginUsers.find(loginUser => {
        if (req.params.email === loginUser.email && hash(req.params.password) === loginUser.password) {
                return (loginUser.tasks.find(task => {
                    if (parseInt(req.params.id) === task.id) {
                        return task
                        }
                    }))
                }
    })

    if (requestedTask) {
        res.status(200).send(requestedTask)
    }
    else {
        res.status(401).send('The task was not found!')
    }

})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))