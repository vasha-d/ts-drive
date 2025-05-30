const express = require('express')
const cookieParser = require('cookie-parser')
const port = 7070
const app = express()
const driveControllers = require('./controllers/files')
const authControllers = require('./controllers/auth')
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const driveRouter = require('./routes/drive')
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/users', driveRouter)



app.listen(port, () => {
    console.log('Running server...');
})