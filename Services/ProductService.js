import { getProduct, getAllProducts, createProduct } from '../Repositories/ProductRepository.js'
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


export {findProducts, findProduct, addProduct}