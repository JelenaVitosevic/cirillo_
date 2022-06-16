const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [
    { id:1, firstName:'Jelena', lastName: 'Vitosevic', email: 'vitosevicjelena83997@gmail.com', password: 'dejaVOLIjecu1' },
    { id:2, name:'Dejan', lastName: 'Arsic', email: 'arsicdejan996@gmail.com', password: 'jecaVoliDeju2' },
]

app.get('/', (req, res) => {
    res.send('Hello Dejo!')
})

app.get('/api/users', (req, res) => {
    res.send(users);
})

app.post('/api/users', (req, res) => {
    const schema = Joi.object({
                        firstName: Joi.string().min(3).required(),
                        lastName: Joi.string().required(),
                        email: Joi.string().min(6).required().email(),
                        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')),
                    })
        //name: Joi.string().min(3).required()

    const result = schema.validate(req.body);
    console.log(result)
    if (result.error) {
        res.status(404).send(result.error.details[0].message)
        return;
    }
        /*res.status(404).send('Name is required and should be minimum 3 characters.')
        return;
    }*/

    const user = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    users.push(user);
    res.send(user)
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id))
    if (!user) res.status(404).send('The user with the given ID was not found!')
    res.send(user)
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}...`))