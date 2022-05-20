const db = require('../../database/models/index');
const Op = db.Sequelize.Op;


const productController = {

    list: async (req, res) => {

        try {

            const productsArray = await db.Product.findAll();

            if(!productsArray.length){
                return res.status(404).json({
                    Error: {
                        status: '404',
                        message: `Error! Couldn't find products on database!`
                    }
                })
            }

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
                products: productsArrayWithUrl
            }

            return res.status(200).json(response);
            
        } catch (error) {

            return res.status(404).json({
                Error: {
                    status: '404',
                    message: `Error! Couldn't find products on database!`
                }
                
            });

        }

    },

    detail: async (req, res) => {

        const id = req.params.id;

        try {

            const productById = await db.Product.findByPk(id);

            console.log(productById);

            if (productById === null) {

                return res.status(404).json({
                    Error: {
                        status: '404',
                        message: `Error! Couldn't find product with id ${id}!`
                    }
                });

            }

            const response = {                
                meta: {
                    status: 200,
                    message: 'Success! Product founded!',
                    // url: `/api/products/${id}`
                },
                product: {
                    ...productById.dataValues,
                    url: `/api/products/${id}`,
                    imageUrl: `/images/products/${productById.image}`
                }
            }

            return res.status(200).json(response);
            
        } catch (error) {

            return res.status(404).json({
                Error: {
                    status: '404',
                    message: `Error! Couldn't find product with id ${id}!`
                }
            });

        }

    },

    store: async (req, res) => {

        console.log(req.body);

        try {

            const productCreated = await db.Product.create({
                ...req.body,
                price: parseFloat(req.body.price),
                image: req.file.filename
            });

            let response = {
                meta: {
                    status: 200,
                    message: 'Success! Product Created!',
                    created: true
                },
                data: productCreated
            }

            return res.status(201).json(response);
            
        } catch (error) {

            return res.status(404).json({
                Error: {
                    status: '404',
                    message: `Error! Couldn't create product!`
                }
                
            });

        }    

    },

    update: async (req, res) => {

        console.log(req.body);

        const id = req.params.id;

        console.log(id);

        try {
            const productToEdit = await db.Product.findByPk(id);
            let img;
            if(req.file != undefined){
                img = req.file.filename;
            } else {
                img = productToEdit.dataValues.image;
            };
            const productUpdated = await db.Product.update(
                {
                    ...req.body,
                    price: parseFloat(req.body.price),
                    image: img
                },
                {
                    where: {
                        id
                    }
                }
            );

            console.log(productUpdated);

            // if(productUpdated[0] === 0){
            //     return res.status(404).json({
            //         Error: {
            //             status: 404,
            //             message: `Error! Couldn't Update Product!`
            //         }
            //     })
            // }

            let response = {
                meta: {
                    status: 201,
                    message: 'Success! Product Updated!',
                    updated: true,
                    url: `/api/products/${id}`
                },
                data: productUpdated.dataValues
            }

            return res.status(201).json(response);
            
        } catch (error) {
            
            return res.status(404).json({
                Error: {
                    status: 404,
                    message: `Error! Couldn't Update Product!`
                }
            })

        }

    },

    destroy: async (req, res) => {

        const id = req.params.id;

        try {

            const productDeleted = await db.Product.destroy(
                {
                    where: {
                        id
                    }
                }
            );

            console.log(productDeleted)

            if(productDeleted === 0) {

                return res.status(404).json({
                    Error: {
                        status: '404',
                        message: `Error! Couldn't delete product with id ${id}!`,
                        deleted: false,
                        productList: '/api/products'
                    }
                });

            }

            let response = {
                meta: {
                    status: 200,
                    message: 'Success! Product deleted!',
                    deleted: true,
                    productList: '/api/products'
                },
                data: productDeleted
            }

            return res.status(200).json(response);
            
        } catch (error) {
            
                return res.status(404).json({
                    Error: {
                        status: '404',
                        message: `Error! Couldn't delete product with id ${id}!`,
                        deleted: false,
                        productList: '/api/products'
                    }
                });

        }
        
    },
    
    searchByName: async (req, res) => {

        console.log(req.query.keyword);

        try {
            
            const searchedProducts = await db.Product.findAll(
                {
                    where: {
                        name: {[Op.like] : "%" + req.query.keyword + "%"}
                    }
                }
            );

            if (!searchedProducts.length) {

                return res.status(404).json({                
                    Error: {
                        status: 404,
                        message: "Error! Couldn't Find Searched Products!",
                        founded: false,
                    }
                }); 
                
            }

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
                products: searchedProductsWithUrl
            }

            return res.status(200).json(response);

        } catch (error) {
            
            return res.status(404).json({
                Error: {
                    status: 404,
                    message: "Error! Couldn't Find Searched Products!",
                    founded: false,
                }
            }); 
            
        }

    }
}

module.exports = productController;



