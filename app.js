const express           = require('express')
const mongoose          = require('mongoose')
const morgan            = require('morgan')
const AuthRoute         = require('./routes/auth')
const PostRoute         = require('./routes/post')
const ProfileRoute      = require('./routes/profile')
const AdminRoute        = require('./routes/admin')
const bodyParser        = require('body-parser')

// connect to database
mongoose.connect('mongodb://localhost:27017/BlogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// check the connection
const connection = mongoose.connection
connection.on('error', (err) => {
    console.log(err)
})
connection.once('open', () => {
    console.log('Connected to MongoDB')
})

// initialize the app
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads/'))

// Linking Auth Route to the app
app.use('/api', AuthRoute)

// Linking Post Route to the app
app.use('/api/post', PostRoute)

// Linking Profile Route to the app
app.use('/api/profile', ProfileRoute)

// Linking Profile Route to the app
app.use('/admin', AdminRoute)

// listen to the app through port 5000
const port = process.env.port || 5000
app.listen(port, () => {
    console.log('Serevr running on port ' + port)
})