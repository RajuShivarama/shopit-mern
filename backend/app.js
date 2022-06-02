const express = require('express');
const app = express();
var cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')
const fileUpload = require('express-fileupload')
// const dotenv = require('dotenv')
const path = require('path')


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(cookieParser())
app.use(cors())
app.use(fileUpload());

// Setting up config file 
if (process.env.NODE_ENV === 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// dotenv.config({ path: 'backend/config/config.env' })

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');


app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

module.exports = app