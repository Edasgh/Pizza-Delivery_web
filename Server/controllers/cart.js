const async_handler = require("express-async-handler");

const CartItem = require("../models/cartItemModel");
const User = require("../models/Usermodel");
const Product = require("../models/Productmodel");



const addToCart = async_handler(async (req, res) => {
    try {
        const userId = req.user.id; // user should be logged in
        const user = await User.findById(userId).select("-password");

        if (user) {

            const { name, quantity, price, variant, productId } = req.body;
            let { extraOptions, category } = req.body;


            let cartId = `${name}-${variant.name}`;

            if (!extraOptions || extraOptions?.length == 0) {
                extraOptions = [];
            }

            if (extraOptions || extraOptions?.length !== 0) {
                for (let i = 0; i < extraOptions.length; i++) {
                    let optionId = await extraOptions[i].id; //find each product in extra options and decrease their quantity
                    let optionItem = await Product.findById(optionId);
                    if (optionItem) {
                        let optionItemQty = await optionItem.quantity;
                        let newOptionItem = {};
                        newOptionItem.quantity = (optionItemQty - quantity);
                        const updatedOptionItem = await Product.findByIdAndUpdate(optionId, { $set: newOptionItem }, { new: true });
                        if (!updatedOptionItem) {
                            res.status(400);
                            throw new Error("Something went wrong!")
                        }
                    }

                }

                if (!category) {
                    for (let i = 0; i < extraOptions.length; i++) {
                        if (extraOptions[i].category == "Non-veg") {
                            category = "Non-veg"
                        } else {
                            category = "Veg"
                        }

                    }
                }
            }


            if (!name || !quantity || ((!extraOptions || extraOptions?.length == 0) && (!category)) || !price || !variant || !productId) {
                res.status(400);
                console.log(name, quantity, category, price, variant);
                console.log(extraOptions);
                throw new Error("Please enter all the fields");

            }


            const existsInCart = await CartItem.findOne({ cartId: cartId });

            const productExits = await Product.findById(productId);
            if (productExits) {
                if (existsInCart) { //suppose if a product with similar variant is already added to the cart then, increase the quantity
                    let newCartItem = {};
                    let cartItemQty = await existsInCart.quantity;
                    newCartItem.quantity = (cartItemQty + quantity);
                    const updatedCartItem = await CartItem.findOneAndUpdate({ cartId: cartId }, { $set: newCartItem }, { new: true });

                    let updatedProduct = {};
                    let productQty = await productExits.quantity;
                    updatedProduct.quantity = (productQty - quantity); //decrese the product's quantity in product
                    const updatedProductQty = await Product.findOneAndUpdate({ name }, { $set: updatedProduct }, { new: true });

                    if (updatedCartItem && updatedProductQty) {

                        res.status(201).json({
                            cartId: updatedCartItem.cartId,
                            _id: updatedCartItem._id,
                            name: updatedCartItem.name,
                            variants: updatedCartItem.variants,
                            extraOptions: updatedCartItem.extraOptions,
                            price: updatedCartItem.price,
                            quantity: updatedCartItem.quantity,
                            description: updatedCartItem.description,
                            category: updatedCartItem.category,
                            image: updatedCartItem.image,

                        })

                    } else {
                        res.status(400);
                        throw new Error("Failed to add to cart!");
                    }

                } else {
                    //create an cartItem object in cartItem model
                    const newProduct = await CartItem.create({
                        cartId,
                        customerId: userId,
                        name,
                        variant,
                        extraOptions,
                        price,
                        quantity,
                        category,
                        productId
                    })

                    let updatedProduct = {};
                    let productQty = await productExits.quantity;
                    updatedProduct.quantity = (productQty - quantity);
                    const updatedQty = await Product.findOneAndUpdate({ name }, { $set: updatedProduct }, { new: true });
                    if (newProduct && updatedQty) {

                        res.status(201).json({
                            _id: newProduct._id,
                            name: newProduct.name,
                            variants: newProduct.variants,
                            extraOptions: newProduct.extraOptions,
                            price: newProduct.price,
                            quantity: newProduct.quantity,
                            description: newProduct.description,
                            category: newProduct.category,
                            image: newProduct.image,

                        })

                    } else {
                        res.status(400);
                        throw new Error("Failed to add to cart!");
                    }
                }



            } else {
                res.status(400);
                throw new Error("This Item doesn't exist!");
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


const updateItemQuantity = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        const { quantity, } = req.body;
        const cartItemId = req.params.id;//we need id parameter here
        const cartItem = await CartItem.findById(cartItemId);
        let cartItemQty = await cartItem.quantity;
        let cartItemName = await cartItem.name;
        const product = await Product.findOne({ name: cartItemName });
        let productQty = await product.quantity;


        if (user && cartItem && (userId == cartItem.customerId)) {
            let newProduct = {};
            let newCartItem = {};
            let increment_decrement;
            if (typeof quantity == "number" && quantity > 0) {
                newCartItem.quantity = quantity;
                if (quantity > cartItemQty) {
                    increment_decrement = quantity - cartItemQty;
                    newProduct.quantity = (productQty - increment_decrement);
                } else if (cartItemQty > quantity) {
                    increment_decrement = cartItemQty - quantity;
                    newProduct.quantity = (productQty + increment_decrement);
                }

            };

            if (cartItem.extraOptions.length !== 0) { //if items have any extraoptions, update their quantity too
                for (let i = 0; i < cartItem.extraOptions.length; i++) {
                    let newOptnItem = {};
                    let optionId = await cartItem.extraOptions[i].id;
                    let option = await Product.findById(optionId);
                    if (option) {

                        let optionQty = option.quantity;
                        if (quantity > cartItemQty) {
                            increment_decrement = quantity - cartItemQty;
                            newOptnItem.quantity = (optionQty - increment_decrement);
                        } else if (cartItemQty > quantity) {
                            increment_decrement = cartItemQty - quantity;
                            newOptnItem.quantity = (optionQty + increment_decrement);
                        }


                        let updatedOptnItem = await Product.findByIdAndUpdate(optionId, { $set: newOptnItem }, { new: true });
                        if (!updatedOptnItem) {
                            res.status(404);
                            throw new Error("Something went wrong!");
                        }
                    }

                }
            }


            const updatedCartItem = await CartItem.findByIdAndUpdate(cartItemId, { $set: newCartItem }, { new: true });
            const updatedProduct = await Product.findOneAndUpdate({ name: cartItemName }, { $set: newProduct }, { new: true });
            if (updatedCartItem && updatedProduct) {
                res.status(201).send(updatedCartItem);
            } else {
                res.status(404);
                throw new Error("Something went wrong!");
            }

        } else {
            res.status(404);
            throw new Error("Action not allowed!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }
})


const removeFromCart = async_handler(async (req, res) => {
    try {
        const userId = req.user.id; //we need auth-token here
        const user = await User.findById(userId).select("-password");

        const cartItemId = req.params.id; //we need cartItem id as parameter here
        const cartItem = await CartItem.findById(cartItemId);
        let cartItemName = await cartItem.name;
        let cartItemQty = await cartItem.quantity;


        const product = await Product.findOne({ name: cartItemName });
        let productQty = await product.quantity;
        let newProduct = {};
        newProduct.quantity = productQty + cartItemQty;




        if (user && cartItem) {
            if (userId == cartItem.customerId) {

                if (cartItem.extraOptions.length !== 0) { //if items have any extraoptions, update their quantity too
                    for (let i = 0; i < cartItem.extraOptions.length; i++) {
                        let newOptnItem = {};
                        let optionId = await cartItem.extraOptions[i].id;
                        let option = await Product.findById(optionId);
                        if (option) {

                            let optionQty = option.quantity;
                            newOptnItem.quantity = optionQty + cartItemQty;


                            let updatedOptnItem = await Product.findByIdAndUpdate(optionId, { $set: newOptnItem }, { new: true });
                            if (!updatedOptnItem) {
                                res.status(404);
                                throw new Error("Something went wrong!");
                            }
                        }

                    }
                }
                await Product.findOneAndUpdate({ name: cartItemName }, { $set: newProduct }, { new: true });
                await CartItem.findOneAndDelete({ _id: cartItemId });
                res.status(200).send("Item removed from cart Successfully!");
            } else {
                res.status(401);
                throw new Error("Action not allowed!");
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

const getCartItems = async_handler(async (req, res) => {
    try {
        let totalPrice = 0, itemTotalPrice = 0;
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        let cartItems;
        if (user) {

            cartItems = await CartItem.find({ customerId: userId });
            for (let i = 0; i < cartItems.length; i++) {
                itemTotalPrice = (cartItems[i].price) + (cartItems[i].variant.price);

                if (cartItems[i]?.extraOptions?.length !== 0) {

                    for (let j = 0; j < cartItems[i].extraOptions.length; j++) {
                        itemTotalPrice += (cartItems[i].extraOptions[j].price);

                    }
                }

                totalPrice += (itemTotalPrice * (cartItems[i].quantity));





            }
            if (cartItems) {
                res.status(200).send({ cartItems: cartItems, totalPrice: totalPrice });
            } else {
                res.status(404);
                throw new Error("An unknown error occurred!");
            }
        } else {
            res.status(404);
            throw new Error("Can't find user!");
        }

    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

module.exports = { addToCart, removeFromCart, getCartItems, updateItemQuantity };