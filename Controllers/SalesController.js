import { sales, makeSale, findSale, findSaleQuantity, salesStore, allSalesFromAStore} from '../Services/SalesService.js'


const getSales = async(request, response) => {
    try{
        const allSales = await sales();
        response.status(200).json({allSales})
    } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}

const salesFromAStore = async(request, response) => {
    if (!request?.params?.storeId) return response.status(400).json({ message: "store id is required." });
    try{
        let storeId = request.params.storeId;
        const sale = await allSalesFromAStore(storeId);
        response.status(200).json({sale})
    } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
    }
}


const getSale = async(request, response) => {
   if (!request?.params?.salesId) return response.status(400).json({ message: "sale id is required." });
   try{
       let salesId = request.params.salesId;
       const sale = await findSale(salesId);
       response.status(200).json({sale})
   } catch(error){
    console.log(error.message)
    response.status(500).json({ success: false, message : error.message})
   }
}



const getSaleQuantity = async(request, response) => {
    if (!request?.params?.salesId) return response.status(400).json({ message: "sale id is required." });
    try{
        let salesId = request.params.salesId;
        const quantity = await findSaleQuantity(salesId);
        response.status(200).json({quantity})
    } catch(error){
     console.log(error.message)
     response.status(500).json({ success: false, message : error.message})
        }
}

const createSale = async(request, response) => {
    try{
        const store = await makeSale(request);
        response.status(201).json({store})
    } catch(error){
        console.log(error.message)
        response.status(500).json({ success: false, message : error.message})
    }
}

const findSaleStore = async(request, response) => {
    if (!request?.params?.salesId) return response.status(400).json({ message: "sale id is required." });

    try{
        let salesId = request.params.salesId;
        const store = await salesStore(salesId);
        response.status(201).json({store})
    } catch(error){
        console.log(error.message)
        response.status(500).json({ success: false, message : error.message})
       }
}



export  {
    getSales, getSale, 
    getSaleQuantity, salesFromAStore,
    createSale, findSaleStore 
}