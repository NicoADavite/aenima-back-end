const db = require('../../database/models');
const Op = db.Sequelize.Op;


const productController = {

    list: async (req, res) => {

        try {

            const productsArray = await db.products.findAll();
    
            const response = {
                meta: {
                    status: 200,
                    message: "Success! Products founded!",
                    length: productsArray.length
                },
                data: productsArray
            }

            res.status(200).json(response);
            
        } catch (error) {

            throw error;
            
        }


    },

    detail: async (req, res) => {

        const id = req.params.id;

        try {

            const productById = await db.Product.findById(id);

            const response = {                
                meta: {
                    status: 200,
                    message: 'Success! Product founded!',
                    url: `/api/products/${id}`
                },
                data: {
                    ...productById
                }
            }

            res.status(200).json(response);
            
        } catch (error) {

            throw error;

        }

    },

    store: async (req, res) => {

        try {

            const productCreated = await db.Product.create({
                ...req.body,
                url: `/api/products/${req.body.id}`
            });

            let response = {
                meta: {
                    status: 200,
                    message: 'Success! Product Created!',
                    created: true,
                    url: productCreated.url
                },
                data: productCreated
            }

            res.status(201).json(response);
            
        } catch (error) {

            throw error;

        }    

    },

    update: async (req, res) => {

        try {

            const id = req.params.id;            

            const productUpdated = await db.Product.update(
                {
                    ...req.body,
                    url: `/api/products/${id}`
                },
                {
                    where: {
                        id
                    }
                }
            );

            let response = {
                meta: {
                    status: 201,
                    message: 'Success! Product Updated!',
                    updated: true,
                    url: productUpdated.url
                },
                data: productUpdated
            }
            
        } catch (error) {
            
            throw error;

        }

    },

    destroy: async (req, res) => {

        try {

            const id = req.params.id;

            const productDeleted = await db.Product.destroy(
                {
                    where: {
                        id
                    }
                }
            );

            let response = {
                meta: {
                    status: 200,
                    message: 'Success! Product deleted!',
                    deleted: true,
                    productList: '/api/products'
                },
                data: productDeleted
            }

            res.status(200).json(response);
            
        } catch (error) {
            
            throw new Error();

        }
        
    },
    
    searchByName: async (req, res) => {

        try {
            
            const searchedProducts = await db.Product.findAll(
                {
                    where: {
                        name: {[Op.like] : "%" + req.body.name + "%"}
                    }
                }
            );

            let response = {
                meta: {
                    status: 200,
                    message: 'Success! Searched Products Founded',
                    founded: true,
                    length: searchedProducts.length
                },
                data: searchedProducts
            }

            res.status(200).json(response);

        } catch (error) {
            
            throw error;
            
        }

    }
}

module.exports = productController;



