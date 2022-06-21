const Joi = require('joi');
const { joiPassword } = require('joi-password');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const app = express();

app.use(express.json());

const users = [];

//let errorMessage = ''

app.get('/', (req, res) => {
    res.send('Jecin API')
})

app.get('/register', (req, res) => {
    res.send(users);
})

app.post('/register', (req, res) => {
    /*const checkEmail = async () => { 
        const newEmail = await req.body.email 
        for (let i=0; i<users.length; i++) {
            if (newEmail === users[i].email) {
                errorMessage = "email is not valid"
            }
        }
    }*/

    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(6).required().email(),//.external(checkEmail),
        password: joiPassword
                    .string()
                    .minOfSpecialCharacters(1)
                    .minOfLowercase(1)
                    .minOfUppercase(1)
                    .minOfNumeric(1)
                    .noWhiteSpaces()
                    .required(),
    })

const result = schema.validate(req.body)//validateAsync(req.body);
console.log(result)

if (result.error) {
        res.status(404).send(result.error.details[0].message)
        return;
    }
/*else if (errorMessage) {
       res.status(404).send(errorMessage)
    }*/ 

    const user = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    
    
    users.push(user);
        res.send(user);  
})

app.post('/login', (req, res) => {
    console.log(req)
    const schema = Joi.object({
        email: Joi.required(),
        password: joiPassword.required(),
    })

    const result = schema.validate(req.body);
    if (result.error) {
    res.status(404).send(result.error.details[0].message)
    return;
    }

    const loginUser = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(loginUser)
    
    for (i=0; i<users.length; i++) {
        console.log(users[i].email)
        console.log(req.body.email)

        if (req.body.email === users[i].email) {
            if (req.body.password === users[i].password) {
                res.status(200).send('Welcome ' + users[i].firstName + ' ' + users[i].lastName + '!' +' You are loged in!')
                console.log(users[i].email + 'true')

            }
            else {
                res.status(401).send('You entered incorect password! Try again!')
            }
        }
        
        
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))