import { findAvailableCementQuantityInStore, updateCementQuantity, salesRep, addStore, Stores, findStore} from '../Services/StoreService.js'


const getStores = async(request, response) => {
    try{
        const stores = await Stores();
        response.status(200).json({stores})
    } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}

const getStore = async(request, response) => {
    if (!request?.params?.storeId) return response.status(400).json({ message: "store id is required." });
    try{
        let storeId = request.params.storeId;
        const store = await findStore(storeId);
        response.status(200).json({store})
    } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}

const getSalesRep = async(request, response) => {
    if (!request?.params?.storeId) return response.status(400).json({ message: "store id is required." });
    try{
        let storeId = request.params.storeId;
        const salesRepresentative = await salesRep(storeId);
        response.status(200).json({salesRepresentative})
    } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}

const getAvailableCementQuantityInStore = async(request, response) => {
    if (!request?.params?.storeId) return response.status(400).json({ message: "store id is required." });
    try{
        let storeId = request.params.storeId;
        const quantity = await findAvailableCementQuantityInStore(storeId);
        response.status(200).json({quantity})
    } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}

const createStore = async(request, response) => {
    try{
        const store = await addStore(request);
        response.status(201).json({store})
    } catch(error){
        console.log(error.message)
        response.status(500).json({ success: false, message : error.message})
       }

}

const updateCementQuantityInStore = async(request, response) => {
    if (!request?.params?.storeId) return response.status(400).json({ message: "store id is required." });

    try{
        let storeId = request.params.storeId;
        const quantity = await updateCementQuantity(storeId, request);
        response.status(201).json({quantity})
    } catch(error){
        console.log(error.message)
        response.status(500).json({ success: false, message : error.message})
       }
}



export  {
    getStores, getStore, getSalesRep, 
    getAvailableCementQuantityInStore, 
    updateCementQuantityInStore, createStore 
}