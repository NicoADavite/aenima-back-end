const db = require('../../database/models');

const productController = {
    list: (req, res) => {
        db.Product.findALl()
            .then( products => {
                
            })
    },
    detail: (req, res) => {
    
    },
    store: (req, res) => {

    },
    update: (req, res) => {

    },
    delete: (req, res) => {
        
    }    
}

module.exports = productController;



