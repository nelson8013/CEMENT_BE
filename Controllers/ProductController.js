import {findProducts, findProduct, addProduct } from '../Services/ProductService.js'
import { request, response } from 'express'


const products = async(request, response) => {
 try{
     const products = await findProducts();
     response.status(200).json({products})
 } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}

const product = async(request, response) => {
 if (!request?.params?.productId) return response.status(400).json({ message: "product id is required." });

 try{
     let productId = request.params.productId;
     const product = await findProduct(productId);
     response.status(200).json({product})
 } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}

const createProduct = async(request, response) => {
    try{
        const product = await addProduct(request);
        response.status(201).json({product})
    } catch(error){
        console.log(error.message)
        response.status(500).json({ success: false, message : error.message})
       }
}



export  {products, product, createProduct }