import {
 getStore,
 getAllStores,
 createStore,
 getAvailableCementQuantityInStore,
 updateCementQuantityInStore,
 getStoreSalesRep
} from '../Repositories/StoreRepository.js'



const Stores  = async () => {
 let store = await getAllStores();
 return { data: store, message: "Stores retrieved successfully" };
}

const addStore  = async (newStore) => {
 let store = await createStore(newStore);
 return { data: store, message: "Store created successfully" };
}

const findStore  = async (storeId) => {
 let store = await getStore(storeId);
 if(!store) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: store, message: "Store retrieved successfully" };
}

const findAvailableCementQuantityInStore  = async (storeId) => {
 let quantity = getAvailableCementQuantityInStore(storeId);
 if(!quantity) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: quantity, message: "Quantity retrieved successfully" };
}


const updateCementQuantity = async ( storeId, quantityToAdd) => {
 let updateQuantity = await updateCementQuantityInStore(storeId, quantityToAdd);
 return { data: updateQuantity, message: "Quantity updated successfully" };
}


const salesRep = async (storeId) => {
 let rep = getStoreSalesRep(storeId);
 if(!rep) throw new NotFoundException(`A store with the Id : ${storeId} does not exist.`);
 return { data: rep, message: "Sales representative retrieved successfully" };
}


export { Stores, addStore, findStore, findAvailableCementQuantityInStore, updateCementQuantity, salesRep}