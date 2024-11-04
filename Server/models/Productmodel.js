const mongoose = require("mongoose");

const productModel = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        product_type: { type: Number, required: true },
        // 0-> Pizza , 1-> Pizza Crust , 2-> Pizza Sauce , 3-> Pizza Toppings , 4->Cheese
        variants: {
            type: [
                {
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                },
            ]
        },// 3 variants : 0. Small (400rs) , 1. Medium (550rs) , 2. Full (750rs)
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String }
    }
)

const Product = mongoose.model("Product", productModel);

module.exports = Product;