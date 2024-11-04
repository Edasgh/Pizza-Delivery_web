const async_handler = require("express-async-handler");

const Product = require("../models/Productmodel");
const User = require("../models/Usermodel");

//only by logged in admin || isAdmin : true

//function to create  pizza / pizza-crust / pizza-sauce / pizza-toppings / cheese
const createProduct = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (user.isAdmin == true) {

            const { name, product_type, quantity, category, price } = req.body;
            let { description, variants, image } = req.body;

            if (!variants) {
                variants = [];
            }
            if (!image) {
                image = " ";
            }
            if (!description) {
                description = " "
            }

            if (!name || !quantity || !category || !product_type || !price) {
                res.status(400);
                console.log(name, quantity, category, product_type, price);
                throw new Error("Please enter all the fields");

            }
            const productExists = await Product.findOne({ name });
            if (productExists) {
                res.status(400);
                throw new Error("This Product already exists!");
            } else {


                //create an Product object in Product model
                const newProduct = await Product.create({
                    name,
                    product_type,
                    variants,
                    price,
                    quantity,
                    description,
                    category,
                    image

                })
                if (newProduct) {
                    res.status(201).json({
                        _id: newProduct._id,
                        name: newProduct.name,
                        product_type: newProduct.product_type,
                        variants: newProduct.variants,
                        price: newProduct.price,
                        quantity: newProduct.quantity,
                        description: newProduct.description,
                        category: newProduct.category,
                        image: newProduct.image,
                        success: true

                    })



                } else {
                    res.status(400);
                    throw new Error("Product creation failed!");
                }
            }

        } else {
            res.status(401);
            throw new Error("Action not allowed!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }



})


//function to update  pizza / pizza-crust / pizza-sauce / pizza-toppings / cheese
const updateProduct = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (user.isAdmin == true) {
            const { name, product_type, variants, price, quantity, description, category, image } = req.body;
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) {
                res.status(404);
                throw new Error("Product not found!");
            }

            let newProduct = {};
            if (name) { newProduct.name = name };
            if (product_type) { newProduct.product_type = product_type };
            if (variants) { newProduct.variants = variants };
            if (price) { newProduct.price = price };
            if (quantity) { newProduct.quantity = quantity };
            if (description) { newProduct.description = description };
            if (category) { newProduct.category = category };
            if (image) { newProduct.image = image };

            const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: newProduct }, { new: true });
            res.status(201).send(updatedProduct);
        } else {
            res.status(404);
            throw new Error("Action not allowed!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }


})

//function to delete product
const deleteProduct = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (user.isAdmin == true) {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) {
                res.status(404);
                throw new Error("Product not found!");

            } else {
                await Product.findOneAndDelete({ _id: productId });
                res.status(200).send("Product Deleted Successfully!");
            }
        } else {
            res.status(404);
            throw new Error("An unknown error occurred!");
        }

    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }

})


//function to view all products || everyone can
const getAllProducts = async_handler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);

    } catch (error) {
        res.status(error.status);
        throw new Error("An unknown error occurred!");
    }

})


//function to view all items whose quantity is below 20 || only admin can
const getProductsBelow20 = async_handler(async (req, res) => {

    const userId = req.user.id; //token required
    const user = await User.findById(userId).select("-password");
    if (user.isAdmin == true) {
        const products = await Product.find({ quantity: { $lt: 20 } });
        res.status(200).send(products);
    }else{
        res.status(400);
    }



})


const searchProducts = async_handler(async (req, res) => {
    try {
        const product_type = req.query.productType;
        const category = req.query.category;
        if (category) {
            const products = await Product.find({ product_type: product_type, category: category });
            res.status(200).send(products);
        } else {
            const products = await Product.find({ product_type: product_type });
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }
})

//function to view a single product || everyone can
const getSingleProduct = async_handler(async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        res.status(200).send(product);

    } catch (error) {
        res.status(error.status);
        throw new Error("An unknown error occurred!");
    }
})


module.exports = { getAllProducts, searchProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, getProductsBelow20 };