require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const {
  errorHandler
} = require('./middleware/errorHandler');
const {
  corsOptions
} = require('./config/corsOption');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/db');
const {
  httpText
} = require('./utils/httpText');
const verifyJWT = require('./middleware/verifyJWT.js');

// Initialize the app
const app = express();
connectDB();

const PORT = process.env.PORT || 3500;

// Middleware
app.use(bodyParser.json({
  extended: true,
  limit: '50mb'
}));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '/public')));

// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('^/$', require('./routes/root.js'))
app.use('/refresh', require('./routes/refresh'))
app.use('/login', require('./routes/api/login'));
// the token is required for the next routes
app.use(verifyJWT)
app.use('/customers', require('./routes/api/customers'));
app.use('/payments', require('./routes/api/payments'));
app.use('/paymentsTypes', require('./routes/api/setting/paymentsTypes.js'));
app.use('/users', require('./routes/api/users'));
app.use('/categories', require('./routes/api/categories'));
// setting
app.use('/setting/paymentsTypes', require('./routes/api/setting/paymentsTypes.js'));
app.use('/setting/orderStatus', require('./routes/api/setting/orderStatus'));
app.use('/setting/orderType', require('./routes/api/setting/orderType'));
app.use('/setting/region', require('./routes/api/setting/region'));
// product
app.use('/product/supplier', require('./routes/api/product/supplier.js'));
app.use('/product/sale', require('./routes/api/product/sale.js'));
app.use('/product/stock', require('./routes/api/product/stock.js'));
app.use('/product/product-specification', require('./routes/api/product/productSpecification.js'));
app.use('/product/pricing', require('./routes/api/product/pricing'));
app.use('/product', require('./routes/api/product')); 

app.use("/sold-items", require("./routes/api/soldItem"));

app.use("/orders", require('./routes/api/order.js')); 

// 404 Error Handler for Unmatched Routes
app.all('*', (req, res) => {
  return res.status(404).json({
    status: httpText.ERROR,
    message: '404 Not Found',
  });
});

// Global Error Handler
app.use(errorHandler);

// Start the Server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});