//? Dependencies
const express = require('express');

//? Initial Configs
const app = express();
app.use(express.json());

//? Files
const { port } = require('./config')

const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');

const db = require('./utils/database');

//!Code
    db.authenticate()
    .then(res => {
        console.log('DB authenticated');
    })
    .catch(err => console.log(err))
    
    console.log("<----------------------<");

    db.sync()
    .then(res => {
        console.log('DB synced');
    })
    .catch(err => console.log(err))

    console.log("<----------------------<");

    app.get('/', (req,res) => { 
        res.status(200).json({
            message: `ok`,
            users: `Localhost:${port}/api/v1/users`
        })
    });

                
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);

app.listen(8000, () => {
    console.log(`Server started at port ${port}`);
})