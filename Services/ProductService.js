import { getProduct, getAllProducts, createProduct, updateQuantity, deactivateProduct } from '../Repositories/ProductRepository.js'
import NotFoundException from '../Exceptions/NotFoundException.js'
import RequiredFieldsException from '../Exceptions/RequiredFieldsException.js'
import { request, response } from 'express'
import bcrypt from 'bcryptjs'


const findProducts = async () => { 
    let products = await getAllProducts();
    if(!products) throw new NotFoundException('There\'re no products available.');
    return { data: products, message:"Products retrieved successfully"}
}
   

const findProduct = async (productId) => { 
 let product = await getProduct(productId);
 if(!product) throw new NotFoundException(`A product with the Id : ${productId} does not exist.`);
 return { data: product, message: "Product retrieved successfully" };
}

const addProduct = async(request) => {

    const { name, description, cost_price, selling_price, quantity, image } = request.body;
    
    if(!name || !description || !cost_price || !selling_price || !quantity){
        throw new RequiredFieldsException(`All fields are required.`);
    }

    const newProduct = {
        name,
        description,
        cost_price,
        selling_price,
        quantity,
        image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    try{
        let product = await createProduct(newProduct);
        return { data: product, message: "Product added successfully" };
    } catch(error) {
        console.log(error.message);
    }
}

const updateProductQuantity = async (productId, updatedQuantity) => {
    try {
        return await updateQuantity(productId, updatedQuantity )
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update product quantity.');
    }
};

const subtractAndUpdateInventory =  async (productId, subtractValue) => {
    let product = await findProduct(productId)

    let updatedQuantity = product.data.quantity - subtractValue 

    if (updatedQuantity < 0) throw new Error('Subtraction value exceeds the current quantity.')

    if (updatedQuantity == 0) await deactivateProduct(productId)
    
    

    await updateProductQuantity(productId, updatedQuantity);

    return { message: 'Inventory updated successfully.' };
}

export { findProducts, findProduct, addProduct, updateProductQuantity, subtractAndUpdateInventory };

// export default {findProducts, findProduct, addProduct, updateProductQuantity, subtractAndUpdateInventory}