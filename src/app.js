const express = require('express')
const fileUpload = require('express-fileupload')
const config = require('./config')
const loaders = require('./loaders')

config()
loaders()


console.log('Hello World!')