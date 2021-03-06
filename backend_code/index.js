require('dotenv').config()

const Joi = require('joi');
const { joiPassword } = require('joi-password');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
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

app.get('/login', (req, res) => {
    res.send(loginUsers);
})

/*app.get('/tasks/:email', (req, res) => {
    let user = loginUsers.find(user => {
        if (user.email === req.params.email) {
            console.log(user)
            return user
        }
        else console.log('ne radi task')
    })
    console.log(user)
    res.send('JECA');
})*/


//HTTP POST REGISTER  
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

//FUNCTION GENERATE ACCESS TOKEN
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
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
            res.status(200).json({accessToken : accessToken})
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


//FUNCTION MIDDLEWARE FOR TOKEN AUTHENTCATION
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
    console.log(loginUser)

    if (loginUser.tasks.length > 0) {
        task.id = loginUser.tasks[loginUser.tasks.length - 1].id + 1
    }
    else {
        task.id = loginUser.tasks.length + 1;
    }

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


//HTTP UPDATE TASK
app.put('/tasks/update/:id', authenticateToken, (req, res) => {

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

   const changedTask = {
    id: req.body.id,
    name: req.body.name,
    time: req.body.time,
    status: req.body.status
    }

   if (task) {
        task = changedTask
        user.tasks = user.tasks.map((taskk => {
            if (taskk.id === task.id) {
                return task
            }
            return taskk
        }))
        res.status(200).send(task)
        console.log(user)
   }
   else {
    res.status(401).send('The task with this id does not exist!')
   }


})


//HTTP DELETE TASK 
app.delete('/tasks/delete/:id', authenticateToken, (req, res) => {
    let user = loginUsers.find(user => {
        if (user.email === req.authUser.email) {
            return user
        }
    })

    let delTask = user.tasks.find(delTask => {
        if (delTask.id === parseInt(req.params.id)) {
            return delTask
        }
   })

   if (delTask) {
      user.tasks = user.tasks.filter(task => task !== delTask)
      res.send(delTask)
   }
})


//HTTP GET STATISTIC
app.get('/stats', authenticateToken, (req, res) => {

    let user = loginUsers.find(user => {
        if (user.email === req.authUser.email) {
            return user
        }
    })

    res.status(200).send(`Dear ${user.firstName}  ${user.lastName}, the statistic page is still under construction!`)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))