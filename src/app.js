const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const config = require('./config')
const loaders = require('./loaders')
const {UserRoutes} = require('./routes')


config()
loaders()

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(
    cors({
        methods: "*",
        origin: "*",
    })
);

app.listen(process.env.PORT, () => {
    console.log(`Application started running on ${process.env.PORT}`)
    app.use('/users', UserRoutes)
})

console.log('Hello World!')