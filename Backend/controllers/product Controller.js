const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsynchErrors = require('../middlewares/catchAsynchErrors');
const APIFeatures = require('../utils/apiFeatures');


// create new product => /api/v1/admin/product/new

exports.newProduct = catchAsynchErrors (async (req, res,next) => {
   req.body.user = req.user.id;
   
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product
  })
})

// Get all products => /api/v1/products

exports.getProducts = catchAsynchErrors (async (req, res,next) => {
  
  const resPerpage = 4;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
                    .search()
                    .filter()
                    .pagination(resPerpage)

  const products = await apiFeatures.query;
res.status(200).json({
  success: true,
  count: products.length,
  productCount,
  products

})

})
// Get single product  => /api/v1/product/:id

exports.getSingleProduct = catchAsynchErrors (async (req, res,next) => {

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
  success: true,
  product

  })

})
// Update Product  => /api/v1/admin/product/:id
exports.updateProduct = catchAsynchErrors (async (req, res,next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
    product
  })
})
// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsynchErrors (async (req, res,next) => {
const product = await Product.findById(req.params.id);

if (!product) {
  return next(new ErrorHandler('Product not found', 404));
}

await product.remove();
res.status(200).json({
 success: true,
  message: 'Product deleted successfully'
})

})
