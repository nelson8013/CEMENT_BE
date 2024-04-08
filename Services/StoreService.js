import {
 getStore,
 storeSalesRep,
 updateQuantity,
 getAllStores,
 createStore,
 getAvailableCementQuantityInStore,
 updateCementQuantityInStore,
 getStoreSalesRep
} from '../Repositories/StoreRepository.js'
import NotFoundException from '../Exceptions/NotFoundException.js'
import {subtractAndUpdateInventory} from '../Services/ProductService.js'




const Stores  = async () => {
 let store = await getAllStores();
 return { data: store, message: "Stores retrieved successfully" };
}

const addStore  = async (request) => {
   try{
     const { name, address, quantity_in_store, sales_rep, productId } = request.body;
     
     if(!name || !address || !quantity_in_store || !sales_rep){
         throw new RequiredFieldsException(`All fields are required.`);
     }
     const newStore = { name, address, quantity_in_store, sales_rep }
     
     let store = await createStore(newStore);

     await subtractAndUpdateInventory(productId, quantity_in_store)

     return { data: store, message: "Store created successfully" };
   } catch(error) {
     console.log(error.message);
   }
}

const findStore  = async (storeId) => {
 let store = await getStore(storeId);
 if(!store) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: store, message: "Store retrieved successfully" };
}

const findAvailableCementQuantityInStore  = async (storeId) => {
 let quantity = await getAvailableCementQuantityInStore(storeId);
 if(!quantity) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: quantity, message: "Quantity retrieved successfully" };
}


const updateCementQuantity = async ( storeId, quantityToAdd) => {
 let updateQuantity = await updateCementQuantityInStore(storeId, quantityToAdd);
 return { data: updateQuantity, message: "Quantity updated successfully" };
}


const updateQuantityAfterSale = async (  quantity) => {
  let updateQty = await updateQuantity(quantity);
  return { data: updateQty, message: "Quantity updated successfully" };
 }

const salesRep = async (storeId) => {
 let rep = await getStoreSalesRep(storeId);
 if(!rep) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: rep, message: "Sales representative retrieved successfully" };
}

const getStoreOfSalesRep = async (sold_by) => {
  let store = await storeSalesRep(sold_by)
  if(!store) throw new NotFoundException(`A store with the sold_by : ${sold_by} does not exist.`);
  return { data: store, message: "Store of sales representative retrieved successfully" };
}


export  {getStoreOfSalesRep, updateQuantityAfterSale, Stores, addStore, findStore, findAvailableCementQuantityInStore, updateCementQuantity, salesRep}