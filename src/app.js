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
    .then(res => console.log('db authenticated'))
    .catch(err => console.log(err))

    db.sync()
    .then(res => console.log('db synced'))
    .catch(err => console.log(err))

    app.use('/api/v1/users', userRouter);
    
    app.use('/api/v1/auth', authRouter);


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})

// 1, 11, 26