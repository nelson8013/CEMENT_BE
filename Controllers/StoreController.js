import { findAvailableCementQuantityInStore, updateCementQuantity, salesRep, addStore} from '../Services/StoreService.js'


const getSalesRep = async(request, response) => {
    if (!request?.params?.storeId) return response.status(400).json({ message: "store id is required." });
    try{
        let storeId = request.params.storeId;
        const salesRepresentative = await salesRep(storeId);
        response.status(200).json({salesRepresentative})
    } catch(error){
     console.log(error.message)
     response.status(500).json(error.message)
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
     response.status(500).json(error.message)
    }
}

const createStore = async(request, response) => {
    try{
        const store = await addStore(request);
        response.status(201).json({store})
    } catch(error){
        console.log(error.message)
        response.status(500).json(error.message)
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
        response.status(500).json(error.message)
       }
}



export  {getSalesRep, getAvailableCementQuantityInStore, updateCementQuantityInStore, createStore }