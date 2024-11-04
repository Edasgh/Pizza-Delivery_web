const mongoose = require("mongoose");

const orderModel = mongoose.Schema(
  {
    razpOrderId: { type: String, required: true, unique: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: {
      type: [
        {
          cartId: { type: String, required: true,unique:false},
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          name: { type: String, required: true },
          category: { type: String, required: true }, // veg or non-veg
          variant: {
            type: {
              name: { type: String, required: true },
              price: { type: Number, required: true }
            }, required: true
          }, //size
          extraOptions: {
            type: [
              {
                name: { type: String, required: true },//extra cheeses or sauces
                price: { type: Number, required: true },
                category: { type: String, required: true }
              },
            ]
          },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        }

      ], required: true
    },
    address: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentDone: { type: Boolean, required: true },
    status: { type: Number, default: 0 } // 0-> Order Placed , 1-> In the Kitchen , 2-> Out for delivery , 3->Delivered
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderModel);

module.exports = Order;