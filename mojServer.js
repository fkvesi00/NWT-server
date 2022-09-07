const { application } = require('express');
const express = require('express');
const server = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(cors())

const database = {
    users : [
        {
            id: '1',
            name: 'Filip',
            email: 'filip@fesb.hr',
            password: 'password',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Mario',
            email: 'mario@fesb.hr',
            password: 'password',
            entries: 0,
            joined: new Date()
        }
    ],
   /*  login:[
        {
            id:'1',
            hash:'',
            email:'filip@fesb.hr'
        }
    ] */
}


server.get('/',(req, res)=>{
    res.send(database)
    console.log(...database.users)
})

server.post('/signin', (req, res) => {
    let found = false;
    database.users.forEach(user => {
        if(user.email === req.body.email && user.password === req.body.password){
            found = true;
            return res.json(user)
        }
    })
    if(!found)
        res.status(404).json('user not found, try register')
   /*  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
        res.json(database.users[0])
    else
        res.status(404).json('user not found, try register') */
})

server.post('/register', (req, res)=> {
    const {email, name, password} = req.body;

    database.users.push({
        id: `${database.users.length+1}`,
        name : name,
        email : email,
        password : password,
        entries : 0,
        joined :new Date()
    })
    res.json(database.users[database.users.length-1])
})

server.get('/profile/:id', (req, res)=>{
    const  {id} = req.params;
    let found = false;
    database.users.forEach(el => {
        if(el.id === id){
            found= true;
           return res.json(el)
        }
    })
    if(!found)
        res.status(404).json('not found')
})

server.put('/image', (req, res) => {
    const  {id} = req.body;
    let found = false;
    database.users.forEach(el => {
        if(el.id === id){
            found= true;
            el.entries++;
           return res.json(el.entries);
        }
    })
    if(!found)
        res.status(404).json('not found')
})






server.listen(3000, () => {
    console.log('server je na portu 3000')
});


/* / --> res = radi
   /signin --> POST succes fail //šaljemo putem posta radi zastite
                                  podataka u tijelu zahtjeva
   /register --> POST user fail
   /profile --> /:userId --> GET user
   /image --> PUT --> user
*/