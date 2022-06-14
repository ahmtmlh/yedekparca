const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const config = require('./config')
const loaders = require('./loaders')
const {UserRoutes, ChatRoutes, ManufacturerRoutes, ProductRoutes} = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const ApiError = require('./errors/ApiError')

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
    app.use('/user', UserRoutes)
    app.use('/chat', ChatRoutes)
    app.use('/manufacturer', ManufacturerRoutes)
    app.use('/product', ProductRoutes)

    app.use((req, res, next) => {
        const error = new ApiError('No endpoint is found', 404);
        next(error);
    });

    app.use(errorHandler)

})

console.log('Hello World!')