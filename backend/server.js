const express = require('express')
const cookieParser = require('cookie-parser')
const port = 7070
const app = express()
const driveControllers = require('./controllers/files')
const authControllers = require('./controllers/auth')
const cors = require('cors')
app.use(cors({
    origin: 'https://ts-drive.vercel.app',
    credentials: true
}))
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  console.log("Cookies:", req.headers.cookie);
  console.log("Authorization:", req.headers.authorization);
  next();
});
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