/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

const products = [
  {
    name: "Nike Air Force 1 '07",
    price: 115,
    desc: "The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
    rating: 4.5,
    brand: "Nike",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/51LLTTw8GJL._AC_SX695_.jpg",
  },
  {
    name: "Nike Air Jordan 4 Retro",
    price: 160,
    desc: "With colors cobbled together from nature, this AJ4 celebrates all things outdoors. Of course, you still get all the classic design features, like a sturdy upper and Nike Air in the sole.",
    rating: 4.4,
    brand: "Nike",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/51WdJo6TaoL._AC_SX695_.jpg",
  },
  {
    name: "Nike Dunk Low",
    price: 90,
    desc: "The Nike Dunk Low is an easy score for your closet. This mid-‘80s hoops icon returns with super-durable construction and original colors.",
    rating: 4.6,
    brand: "Nike",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/6109VR+1KbL._AC_SX695_.jpg",
  },
  {
    name: "Nike Air Jordan 1 Low",
    price: 115,
    desc: "Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh.",
    rating: 4.7,
    brand: "Nike",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/61XwtO9GzfL._AC_SX695_.jpg",
  },
  {
    name: "Men's UA Charged Pursuit 3 Running Shoes",
    price: 70.99,
    desc: "Light and flexible is the name of the game here. A lot of mesh for breathability and Charged Cushioning® to help protect against impact.",
    rating: 4.4,
    brand: "Under Armour",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/61Ps2D+ktAL._AC_SY575_.jpg",
  },
  {
    name: "Boys' Grade School UA Charged Rogue 3 Running Shoes",
    price: 59.99,
    desc: "We paired lightweight, breathable mesh with our Charged Cushioning® midsole for amazing responsiveness, maximum impact absorption, and a snappy feel that keeps you running and running.",
    rating: 4.3,
    brand: "Under Armour",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/71R779vIZ2L._AC_SX695_.jpg",
  },
  {
    name: "Women's UA Glyde RM Softball Cleats",
    price: 39.99,
    desc: "Women's feet are a different shape than men's. That's a fact. These shoes were built for women by women, giving you the best fit, traction, breathability, and serious score power.",
    rating: 4.5,
    brand: "Under Armour",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10],
    image: "https://m.media-amazon.com/images/I/51k0a5YbBrL._AC_SY695_.jpg",
  },
  {
    name: "Women's UA HOVR™ Turbulence Running Shoes",
    price: 99.99,
    desc: "Distance runners need a perfect mix of cushion, bounce, durability, and efficiency. ",
    rating: 4.6,
    brand: "Under Armour",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
    image: "https://m.media-amazon.com/images/I/81jCbSK6kPL._AC_SX695_.jpg",
  },
  {
    name: "Made in USA 990v4",
    price: 284.99,
    desc: "The 990’s original designers were tasked with creating the single best running shoe on the market. The finished product more than lived up to its billing.",
    rating: 4.7,
    brand: "New Balance",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/71EYGFxxNYL._AC_SX575_.jpg",
  },
  {
    name: "Fresh Foam X Hierro v7",
    price: 189.99,
    desc: "For those who take going off the beaten path literally, there’s the Fresh Foam X Hierro, a dedicated, off-road application of our best running technology.",
    rating: 4.7,
    brand: "New Balance",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/71E4x0eEnYL._AC_SY695_.jpg",
  },
  {
    name: "Fresh Foam Garoé",
    price: 129.99,
    desc: "Take to the trails with confidence in our Fresh Foam Garoé, designed with technology and comfort top-of-mind. This men's running shoe features a lightweight, ultra-plush ",
    rating: 4.8,
    brand: "New Balance",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/51HNLVp-X5L._AC_SY575_.jpg",
  },
  {
    name: "DynaSoft Nitrel V5",
    price: 119.99,
    desc: "These men's trail running shoes are built to withstand daily wear, featuring no-sew overlays, engineered mesh, and a durable AT Tread outsole.",
    rating: 4.6,
    brand: "New Balance",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    image: "https://m.media-amazon.com/images/I/51mSNB7pwFL._AC_SY695_.jpg",
  },
];

const admin = {
  email: "admin@gmail.com",
  password: "Admin@123",
  userType: "Admin",
};

module.exports = { products, admin };
