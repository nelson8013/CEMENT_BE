import {
 getSale,
 getAllSales,
 createSale,
 getSaleQuantity,
 getAllSaleFromAStore,
 getStoreASaleOccurred
} from '../Repositories/SalesRepository.js'
import NotFoundException from '../Exceptions/NotFoundException.js'
import Store from '../Models/Store.js'
// import { getStoreOfSalesRep } from '../Services/StoreService'


const sales  = async () => {
 let sales = await getAllSales();
 return { data: sales, message: "Sales retrieved successfully" };
}

const makeSale  = async (request) => {
   try{
     const { buyers_phone, selling_price, quantity, delivery_address, sold_by } = request.body;
     
     if(!buyers_phone || !selling_price || !quantity || !sold_by){
         throw new RequiredFieldsException(`All fields are required.`);
     }

     //TODO move this to it's service
     const store  = await Store.findOne({ sales_rep: sold_by });

     const newSale = { 
      buyers_phone, 
      selling_price, 
      quantity, 
      delivery_address, 
      sold_by, 
      sold_at : store._id 
     }
     
     let sale = await createSale(newSale);

     //TODO move this to it's service too
     await Store.findByIdAndUpdate(store._id, { $inc: { quantity_in_store: -quantity } });

     return { data: sale, message: "Sale made successfully" };
   } catch(error) {
     console.log(error.message);
   }
}

const findSale  = async (salesId) => {
 let sale = await getSale(salesId);
 if(!sale) throw new NotFoundException(`A sale with the Id : ${salesId} does not exist.`);
 return { data: sale, message: "Sale retrieved successfully" };
}

const findSaleQuantity  = async (salesId) => {
 let quantity = await getSaleQuantity(salesId);
 if(!quantity) throw new NotFoundException(`A sale with the Id : ${salesId} does not exist.`);
 return { data: quantity, message: "Quantity retrieved successfully" };
}


const salesStore = async (salesId) => {
 let store = await getStoreASaleOccurred(salesId);
 if(!store) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: store, message: "Store retrieved successfully" };
}

const allSalesFromAStore = async (storeId) => {
 let sales = await getAllSaleFromAStore(storeId);
 if(!sales) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: sales, message: "Sales retrieved successfully" };
}


export { sales, makeSale, findSale, findSaleQuantity, salesStore, allSalesFromAStore}