require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/Product");
const User = require("./models/User");

const { products, admin } = require("./data");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(products);

    const user = await User.findOne({
      userType: "Admin",
      email: "admin@gmail.com",
    });

    if (user) {
      await User.deleteOne({ email: user.email });
    }
    await User.create(admin);

    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
