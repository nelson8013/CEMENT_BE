import Store from '../Models/Store.js'



/**
 * Retrieves all stores from the database.
 *
 * @return {Promise<Array<Object>>} An array of store objects.
 */
const getAllStores = async () => {
   try{
     return await Store.find()
    } catch(error) {
     console.log(error.message)
   }
}

/**
 * Get a store by its ID.
 * @param {string} storeId - The ID of the product to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the store object if found, or null if not found.
*/
const getStore = async ( storeId ) => {
   try{
    let store = await Store.findOne({_id : storeId}).exec()
    if (!store) throw new Error('Store not found')
    return store
  } catch(error) {
    console.log(error.message)
  }
}

const getStoreWithSalesRep = async ( storeId ) => {
  try{
   let store = await Store.findOne({_id : storeId}).populate('sales_rep', 'first_name last_name email phone')
   if (!store) throw new Error('Store not found')
   return store
 } catch(error) {
   console.log(error.message)
 }
}

const getStoreByName = async ( storeName ) => {
  try{
      return await Store.findOne({ name: storeName }).exec();
    } catch(error) {
      console.log(error.message)
    }
  }

  const getStoreByAddress = async ( storeAddress ) => {
    try{
        return await Store.findOne({ address: storeAddress }).exec();
      } catch(error) {
        console.log(error.message)
      }
  }

  const getStoreBySalesRep = async ( salesRep ) => {
    try{
        return await Store.findOne({ sales_rep: salesRep }).exec();
      } catch(error) {
        console.log(error.message)
      }
  }



/**
 * Creates a new store using the provided data.
 *
 * @param {Object} newStore - The data for the new store.
 * @return {Promise<Object>} A promise that resolves to the created store object.
 */
const createStore = async( newStore ) => {
    try{
        return await Store.create(newStore);
    } catch(error) {
        console.log(error.message);
    }
}

/**
 * Retrieves the sales representative for the specified store.
 *
 * @param {string} storeId - The ID of the store to retrieve the sales representative for.
 * @return {string} The sales representative for the specified store.
 */
const getStoreSalesRep = async ( storeId ) => {
 try{
    let store = await getStore(storeId)
    return store.sales_rep
  } catch(error) {
   console.log(error.message);
  }
} 

/**
 * Retrieves the available quantity of cement in a specific store.
 *
 * @param {string} storeId - The ID of the store to retrieve the quantity from
 * @return {number} The available quantity of cement in the store
 */
const getAvailableCementQuantityInStore = async ( storeId ) => {
  try{
   let store = await getStore(storeId)

   return store.quantity_in_store
  } catch(error) {
    console.log(error.message);
  }
}

/**
 * Update the quantity of cement in a store and return the updated store.
 *
 * @param {string} storeId - The ID of the store to update.
 * @param {number} quantityToAdd - The quantity of cement to add to the store.
 * @return {Promise<object>} The updated store object.
 */
const updateCementQuantityInStore = async ( storeId, quantityToAdd ) => {
   try{
    const updatedStore = await Store.findByIdAndUpdate(
     storeId,
     { $inc: { quantity_in_store: quantityToAdd } },
     { new: true } );

   if (!updatedStore) throw new Error('Store not found');
   
   return updatedStore;
   } catch(error) {
     console.log(error.message);
   }
}

const updateQuantity = async( quantity) => {
  return await Store.findByIdAndUpdate(sold_at, { $inc: { quantity_in_store: -quantity } });
}


 /**
 * Fetch the store associated with the sold_by user.
 *
 * @param {string} sold_by - The User ID of the sales representative at a store.
 * @return {Promise<object>} The store object associated with the sold_by user.
 */
const storeSalesRep = async (sold_by) => {
  return await Store.findOne({ sales_rep: sold_by });
}
export {
 getStore,
 storeSalesRep,
 updateQuantity,
 getAllStores,
 createStore,
 getAvailableCementQuantityInStore,
 updateCementQuantityInStore,
 getStoreSalesRep,
 getStoreBySalesRep,
 getStoreByAddress,
 getStoreWithSalesRep,
 getStoreByName
}