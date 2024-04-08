import Product from '../Models/Product.js'



const getAllProducts = async () => {
   try{
     return await Product.find()
    } catch(error) {
     console.log(error.message)
   }
}

/**
 * Get a product by its ID.
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the product object if found, or null if not found.
*/
const getProduct = async (productId) => {
   try{
    return await Product.findOne({_id : productId})
  } catch(error) {
    console.log(error.message)
  }
}

const createProduct = async( newProduct) => {
    try{
        return await Product.create(newProduct);
    } catch(error) {
        console.log(error.message);
    }
}

const updateQuantity = async(productId, quantity) => {
  return await Product.findByIdAndUpdate(productId, { quantity: quantity }, { new: true });
}

const deactivateProduct = async(productId) => {
  return await Product.findByIdAndUpdate(productId, { isActive: false }, { new: true });
}

const activateProduct = async(productId) => {
  return await Product.findByIdAndUpdate(productId, { isActive: true }, { new: true });
}

export {
 getProduct,
 getAllProducts,
 updateQuantity,
 activateProduct,
 deactivateProduct,
 createProduct
}