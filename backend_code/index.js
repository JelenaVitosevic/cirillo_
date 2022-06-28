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

let refreshTokens = [];


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
    res.status(201).json(user)
    } 
    })


//HTTP POST TOKEN REQUEST
app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ email: user.email })
        res.json({ accessToken: accessToken })
    })
})


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

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

    let checkedUser = users.find(user => {
        if (req.body.email === user.email) {
            return user
        }
        else return null
    })

    if(checkedUser) {
        if (hash(req.body.password) === checkedUser.password) {
            const accessToken = generateAccessToken(checkedUser)
            const refreshToken = jwt.sign(checkedUser, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.status(200).json({accessToken : accessToken, refreshToken : refreshToken})
            checkedUser.TOKEN = accessToken
            loginUsers.push(checkedUser)
        }
        else {
            res.status(401).send('You entered incorect password! Try again!')
        }
    }
    else {
        res.status(401).send('You entered incorect email! Try again!')
    } 
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //vraca ili token, ili undefined
    if (token == null) return res.status(401).send('NO TOKEN, NO ENTRY')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authUser) => {
        if (err) return res.sendStatus(403)
        req.authUser = authUser
        next()
    })
}

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

//HTTP POST TASK REQUEST    
app.post('/tasks', authenticateToken, (req, res) => {
    
    const schema = Joi.object({
        name: Joi.string().required(),
        time: Joi.number().required(),
        status: Joi.required(),
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const task = {
        name: req.body.name,
        time: req.body.time,
        status: req.body.status
    }

    let loginUser = loginUsers.find(loginUser => {
        if (loginUser.email === req.authUser.email) {
            return loginUser
        }
    })

    task.id = loginUser.tasks.length + 1;
    loginUser.tasks.push(task)
    res.status(201).send(loginUser)   
})


//HTTP GET TASK REQUEST 
app.get('/tasks/:id', authenticateToken, (req, res) => {
    
    let user = loginUsers.find(user => {
        if (user.email === req.authUser.email) {
            return user
        }
    })

   let task = user.tasks.find(task => {
        if (task.id === parseInt(req.params.id)) {
            return task
        }
   })

   if (task) {
        res.status(200).send(task)
   }
   else {
        res.status(401).send('The task with this id does not exist!')
   }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))