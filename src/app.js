// importing external packages
const express = require('express');
const cors = require('cors');
// require('dotenv').config()
const path = require('path');
const methodOverride = require('method-override');

// importing routers
const mainRouter = require('./routes/api/index.js')
const productsRouter = require('./routes/api/products.js');

// express instance
const app = express();

// config global middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));


const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// config global routes
app.use("/", mainRouter);
app.use("/api/products", cors(corsOptions), productsRouter)

// setting PORT
let port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Servidor funcionando ${port}`); //
});