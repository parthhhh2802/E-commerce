// assets.js

import logo from './logo.png'
import search_icon from './search_icon.png'
import profile_icon from './profile_icon.png'
import cart_icon from './cart_icon.jpg'
import menu_icon from './menu_icon.jpg'
import dropDown_icon from './dropDown_icon.png'
import hero_img from './hero_img.png'
import exchange_icon from './exchange_icon.png'
import return_icon from './return_icon.jpg'
import shipping_icon from './shipping_icon.png'
import quality_icon from './quality_icon.png'
import filter_icon from './filter_icon.png'
import RoundNeckTop from './RoundNeckTop.jpg'
import BlueDenimJeans from './BlueDenimJeans.jpg'
import search_cross_icon from './search_cross_icon.png'
import star_icon from './star_icon.jpeg'
import bin_icon from './bin_icon.png'
import stripe_icon from './stripe_logo.png'
import razonpay_icon from './razorpay_logo.png'


// all icons/images
const assets = {
  currency: "₹",
  bin_icon,
  logo,
  search_icon,
  profile_icon,
  cart_icon,
  menu_icon,
  dropDown_icon,
  hero_img,
  exchange_icon,
  return_icon,
  shipping_icon,
  quality_icon,
  filter_icon,
  search_cross_icon,
  star_icon,
  stripe_icon,
  razonpay_icon
  
}

// 👕 Fashion products (detailed structure)
export const products = [
  {
    id: "aaaa",
    name: "Women Round Neck Top",
    description: "Comfortable cotton top with round neck, perfect for daily wear.",
    price: 150,
    image: [RoundNeckTop ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    bestseller: true,
  },
  {
    id: "aaab",
    name: "Blue Denim Jeans",
    description: "Slim fit stretchable denim jeans.",
    price: 1999,
    image: [BlueDenimJeans],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["30", "32", "34", "36"],
    date: 1716634345448,
    bestseller: false,
  },
  {
    id: "aaac",
    name: "Summer Floral Dress",
    description: "Lightweight and stylish floral dress for casual outings.",
    price: 1799,
    image: [],
    category: "Women",
    subCategory: "Dresses",
    sizes: ["S", "M", "L"],
    date: 1716634345448,
    bestseller: true,
  },
  {
    id: "aaad",
    name: "Black Casual Shoes",
    description: "Durable and stylish casual shoes for everyday use.",
    price: 2499,
    image: ["https://via.placeholder.com/300?text=Casual+Shoes"],
    category: "Men",
    subCategory: "Footwear",
    sizes: ["7", "8", "9", "10"],
    date: 1716634345448,
    bestseller: false,
  },
  {
    id: "aaae",
    name: "Slim Fit Checked Shirt",
    description: "Trendy checked shirt in slim fit design.",
    price: 1199,
    image: ["https://via.placeholder.com/300?text=Checked+Shirt"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716634345448,
    bestseller: true,
  },
  // New products added from foreverbuy.in
  {
    id: "aaaf",
    name: "Green Floral Anarkali Set",
    description: "Elegant green floral printed Anarkali kurta paired with a dupatta and trousers.",
    price: 1299,
    image: ["https://via.placeholder.com/300?text=Green+Anarkali"],
    category: "Women",
    subCategory: "Ethnic Wear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    date: 1726989600000, // Updated timestamp
    bestseller: true,
  },
  {
    id: "aaag",
    name: "Maroon Striped Casual Shirt",
    description: "A stylish maroon casual shirt with vertical stripes in a slim fit design.",
    price: 899,
    image: ["https://via.placeholder.com/300?text=Maroon+Striped+Shirt"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1726989600000,
    bestseller: true,
  },
  {
    id: "aaah",
    name: "Pink Embellished Block Heels",
    description: "Fashionable pink block heels with elegant embellishments for a chic look.",
    price: 999,
    image: ["https://via.placeholder.com/300?text=Pink+Block+Heels"],
    category: "Women",
    subCategory: "Footwear",
    sizes: ["6", "7", "8"],
    date: 1726989600000,
    bestseller: false,
  },
  {
    id: "aaai",
    name: "Navy Blue Slim Fit Chinos",
    description: "Versatile navy blue solid chinos in a comfortable slim fit.",
    price: 1199,
    image: ["https://via.placeholder.com/300?text=Navy+Chinos"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["30", "32", "34", "36"],
    date: 1726989600000,
    bestseller: false,
  },
]

// default export for other assets
export default assets