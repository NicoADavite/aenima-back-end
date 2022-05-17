const db = require('../../database/models/index');
const Op = db.Sequelize.Op;


const productController = {

    list: async (req, res) => {

        try {

            const productsArray = await db.Product.findAll();

            const productsArrayWithUrl = productsArray.map( product => {
                let editedProduct = {
                     ...product.dataValues,
                     url: `/api/products/${product.id}`,
                     imageUrl: `/images/products/${product.image}`
                }
                return editedProduct;
            })
    
            const response = {
                meta: {
                    status: 200,
                    message: "Success! Products founded!",
                    length: productsArrayWithUrl.length
                },
                data: productsArrayWithUrl
            }

            res.status(200).json(response);
            
        } catch (error) {

            throw error;
            
        }

    },

    detail: async (req, res) => {

        const id = req.params.id;

        try {

            const productById = await db.Product.findByPk(id);

            const response = {                
                meta: {
                    status: 200,
                    message: 'Success! Product founded!',
                    // url: `/api/products/${id}`
                },
                data: {
                    ...productById.dataValues,
                    url: `/api/products/${id}`,
                    imageUrl: `/images/products/${productById.image}`
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
                price: parseFloat(req.body.price)
            });

            let response = {
                meta: {
                    status: 200,
                    message: 'Success! Product Created!',
                    created: true,
                    // url: productCreated.url
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
                    price: parseFloat(req.body.price),
                    // url: `/api/products/${id}`
                },
                {
                    where: {
                        id: id
                    }
                }
            );

            let response = {
                meta: {
                    status: 201,
                    message: 'Success! Product Updated!',
                    updated: true,
                    // url: productUpdated.url
                },
                data: productUpdated
            }

            res.status(201).json(response);
            
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

            const searchedProductsWithUrl = searchedProducts.map(searchedProduct => {
                const editedProduct = {
                    ...searchedProduct.dataValues,
                    url: `/api/products/${searchedProduct.id}`,
                    imageUrl: `/images/products/${searchedProduct.image}`
                }
                return editedProduct;
            })

            let response = {
                meta: {
                    status: 200,
                    message: 'Success! Searched Products Founded',
                    founded: true,
                    length: searchedProductsWithUrl.length
                },
                data: searchedProductsWithUrl
            }

            res.status(200).json(response);

        } catch (error) {
            
            throw error;
            
        }

    }
}

module.exports = productController;



