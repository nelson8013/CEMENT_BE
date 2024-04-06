import Sales from '../Models/Sales.js'



/**
 * Retrieves all stores from the database.
 *
 * @return {Promise<Array<Object>>} An array of store objects.
 */
const getAllSales = async () => {
   try{
     return await Sales.find()
    } catch(error) {
     console.log(error.message)
   }
}

/**
 * Get a Sale by its ID.
 * @param {string} salesId - The ID of the Sale to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the sales object if found, or null if not found.
*/
const getSale = async ( salesId ) => {
   try{
    return await Sales.findOne({_id : salesId})
                      .populate('sold_by', 'first_name last_name email phone')
                      .populate('sold_at', 'name address')
  } catch(error) {
    console.log(error.message)
  }
}


/**
 * Creates a new sale using the provided data.
 *
 * @param {Object} newSale - The data for the new sale.
 * @return {Promise<Object>} A promise that resolves to the created sale object.
 */
const createSale = async( newSale ) => {
    try{
        return await Sales.create(newSale);
    } catch(error) {
        console.log(error.message);
    }
}

/**
 * Retrieves all the sales from a particular store.
 *
 * @param {string} storeId - The ID of the store to retrieve the sales.
 * @return {Object} The sales from the store.
 */
const getAllSaleFromAStore = async ( storeId ) => {
  try{
     let sales = await Sales.find({sold_at : storeId}).populate('sold_at', 'name address')
     if (!sales) throw new Error('Sales not found')
     return sales
   } catch(error) {
    console.log(error.message);
   }
 } 



/**
 * Retrieves the store a sale occurred.
 *
 * @param {string} salesId - The ID of the sale to retrieve.
 * @return {Object} The store that a sale occurred.
 */
const getStoreASaleOccurred = async ( salesId ) => {
 try{
    let sale = await Sales.findOne({_id : salesId}).populate('sold_at', 'name address')
    if (!sale) throw new Error('sale not found')
    return sale.sold_at;
  } catch(error) {
   console.log(error.message);
  }
} 

/**
 * Retrieves the quantity of cement sold in a specific sale.
 *
 * @param {string} salesId - The ID of the sale to retrieve the quantity from
 * @return {number} The actual quantity of cement sold
 */
const getSaleQuantity = async ( salesId ) => {
  try{
   let sale = await getSale(salesId)
   if (!sale) throw new Error('Sale not found')

   return sale.quantity
  } catch(error) {
    console.log(error.message);
  }
}

export {
 getSale,
 getAllSales,
 createSale,
 getSaleQuantity,
 getAllSaleFromAStore,
 getStoreASaleOccurred
}