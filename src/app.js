// importing external packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');

// importing routers
const mainRouter = require('./routes/api/index.js')
const productsRouter = require('./routes/api/products.js');

// express instance
const app = express();

// config global middlewares
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

// config global routes
app.use("/", mainRouter);
app.use("/api/products", productsRouter)

// setting PORT
const PORT = 3001;

// lifting server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})