import {
 getStore,
 storeSalesRep,
 updateQuantity,
 getAllStores,
 createStore,
 getAvailableCementQuantityInStore,
 updateCementQuantityInStore,
 getStoreSalesRep,
 getStoreByAddress,
 getStoreByName,
 getStoreBySalesRep,
 getStoreWithSalesRep
} from '../Repositories/StoreRepository.js'
import NotFoundException from '../Exceptions/NotFoundException.js'
import {subtractAndUpdateInventory} from '../Services/ProductService.js'
import RequiredFieldsException from '../Exceptions/RequiredFieldsException.js'
import StoreAlreadyExistsException from '../Exceptions/StoreAlreadyExistsException.js'
import OutOfStockException from '../Exceptions/OutOfStockException.js'





const Stores  = async () => {
 let store = await getAllStores();
 return { data: store, message: "Stores retrieved successfully" };
}

const findStore  = async (storeId) => {
  let store = await getStore(storeId);
  return { data: store, message: "Store retrieved successfully" };
 }

const addStore  = async (request) => {
   try{
     const { name, address, sales_rep} = request.body;
     
     if(!name || !address || !sales_rep){
         throw new RequiredFieldsException(`All fields are required.`);
     }

     const duplicateName    = await getStoreByName(name);
     const duplicateAddress = await getStoreByAddress(address);
     const duplicateRep     = await getStoreBySalesRep(sales_rep);

     if (duplicateName || duplicateAddress || duplicateRep) {
      throw new StoreAlreadyExistsException( "This store already exists" );
     }


     const newStore = { name, address, sales_rep }
     
     let store = await createStore(newStore);

     //await subtractAndUpdateInventory(productId, quantity_in_store)

     return { data: store, message: "Store created successfully" };
   } catch(error) {
     console.log(error.message);
   }
}



const findAvailableCementQuantityInStore  = async (storeId) => {
 let quantity = await getAvailableCementQuantityInStore(storeId);
 if(quantity == 0) throw new OutOfStockException(`The store is out of stock.`);
 return { data: quantity, message: "Quantity retrieved successfully" };
}


const updateCementQuantity = async ( storeId,request) => {
  const { quantityToAdd } = request.body;
  //TODO: CHECK IF THE IS A PRODUCT WITH QUANTITY EQUAL TO OR MORE THAN THE QUANTITY TO ADD
 let updateQuantity = await updateCementQuantityInStore(storeId, quantityToAdd);
 return { data: updateQuantity, message: "Quantity updated successfully" };
}


const updateQuantityAfterSale = async (  quantity) => {
  let updateQty = await updateQuantity(quantity);
  return { data: updateQty, message: "Quantity updated successfully" };
 }

const salesRep = async (storeId) => {
 let rep = await getStoreWithSalesRep(storeId);
 rep = rep.sales_rep
 return { data: rep, message: "Sales representative retrieved successfully" };
}

const getStoreOfSalesRep = async (sold_by) => {
  let store = await storeSalesRep(sold_by)
  if(!store) throw new NotFoundException(`A store with the sold_by : ${sold_by} does not exist.`);
  return { data: store, message: "Store of sales representative retrieved successfully" };
}


export  {getStoreOfSalesRep, updateQuantityAfterSale, Stores, addStore, findStore, findAvailableCementQuantityInStore, updateCementQuantity, salesRep}