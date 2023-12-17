const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getAllCartItems = async (req, res) => {
  const cartItems = await Cart.find({});
  res.status(200).json(cartItems);
};

const getUserCartItems = async (req, res) => {
  const { id: userId } = req.user;

  const userCartItems = await Cart.findOne({ userId: userId });
  res.status(200).json(userCartItems);
};

// reference: https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
const updateCart = async (req, res) => {
  const { id: userId } = req.user;
  const { id: productId, size, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // cart exists for user
      const itemIndex = cart.products.findIndex(
        (p) => p.productId === productId
      );
      if (itemIndex > -1) {
        // product exists in the cart. So update quantity
        const productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        // product does not exist in cart. So add new item
        const product = await Product.findOne({ _id: productId });
        cart.products.push({
          productId,
          name: product.name,
          image: product.image,
          brand: product.brand,
          quantity,
          price: product.price,
          size,
        });
      }
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      // no cart for user. So create new cart
      const product = await Product.findOne({ _id: productId });
      const newCart = await Cart.create({
        userId,
        products: [
          {
            productId,
            name: product.name,
            image: product.image,
            brand: product.brand,
            quantity,
            price: product.price,
            size,
          },
        ],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCartItems = async (req, res) => {
  const { productId } = req.params;
  const { id: userId } = req.user;

  let cart = await Cart.findOne({ userId });

  cart.products = cart.products.filter(
    (product) => product.productId !== productId
  );
  cart = await cart.save();
  res.status(200).json(cart);
};

const deleteAllCart = async (req, res) => {
  const { id: userId } = req.user;

  let cart = await Cart.findOne({ userId });
  cart.products = [];
  cart = await cart.save();
  res.status(200).json(cart);
};

module.exports = {
  getAllCartItems,
  getUserCartItems,
  updateCart,
  deleteCartItems,
  deleteAllCart,
};
