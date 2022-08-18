const mongoose = require ('mongoose')
const productSchema = new mongoose.Schema({
  name:{
    type: String,
 required: [true, 'Please enter a product name'],
 trim: true,
 maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  price:{
    type: Number,
 required: [true, 'Please enter  product price'],
 maxLength: [5, 'Product name cannot exceed 5 characters'],
 default_price: 0.0
  },
  description:{
    type: String,
 required: [true, 'Please enter  product description'],
  },
  ratings: {
    type: Number,
    default: 0
  },
  images:[
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    }
  ],
  category: {
    type: String,
    required: [true,'Please select a category for this product'],
    enum:{
      values: [
      'Electronics', 
      'Cameras',
      'Laptops',
      'Accessories',
      'Headphones',
      'Food',
      'Books',
      'Clothes/Shows',
      'Beauty/Health',
      'Sports',
      'Outdoor',
      'Home'
    ],
    message: 'Please select a valid category for the product'
    }
  },
  seller:{
    type: String,
    required: [true, 'Please enter a product seller'],
  },
  stock:{
    type: Number,
    required: [true, 'Please enter  product stock'],
  maxLength: [5, 'Product name cannot exceed 5 characters'],
  default: 0
  },
  numofReviews:{
    type: Number,
    default: 0
  },
  reviews:[
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name:{
        type: String,
        required: true
      },
      ratings:{
        type: Number,
        required: true
      },
      comment:{
      type: String,
      required: true
    }
    }
  ],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Product', productSchema);