const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const config = require('./config')
const loaders = require('./loaders')
const {UserRoutes, ChatRoutes, ManufacturerRoutes, ProductRoutes} = require('./routes')

// I suspect this will not be required once the chat route is exported, which exports chat service, which export 
// chat model
const ChatModel = require('./models/Chat')


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
        const error = new Error('No endpoint is found');
        error.status = 404;
        next(error);
    });

})

console.log('Hello World!')