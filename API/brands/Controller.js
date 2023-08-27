const {BrandFromModel}=require('./Model')  //schema k acording data leny wala variable template
// for database connection hum ab kuch cheezain import krengy
const {connect} = require('mongoose')
require('dotenv').config()  //for mongourl 


const CreateBrand= async (req,res)=>{
    const {BrandName,BrandImage}=req.body;


    // agar koi field missing hogi to woh mongo ki taraf jayega hi nahi
    if (!BrandName || !BrandImage){
        res.status(403).json({
            message:"Some Fields are Missing"
        })
    }else{
        try {
            await connect(process.env.MONGO_URL)
            // res.json({
            //     message:"database connected"
            // })

            // agar DB main jo user Brand name likh kr bhej raha wo  Brand already moujood hai toh error dedo 400 
            const checkExistance= await BrandFromModel.exists({ BrandName })
            if(checkExistance){
                res.status(400).json({
                    message:"Brand already exists"
                })
            }
            else{
                await BrandFromModel.create({BrandName,BrandImage})
                const AllBrands=await BrandFromModel.find()
                res.json({
                    message:"new Brand Created",
                    AllBrand:AllBrands

                })
            }
        
        }    catch (error) {
            res.status(400).json({
                message:"Some error came:",
                errorMessage:error.message
            })
            
        }
    }
}
const BrandByName=async(req,res)=>{
    const {BrandName}=req.query

    try {
     await connect(process.env.MONGO_URL)
     const BrandByName=await BrandFromModel.findOne({BrandName})
     res.json({BrandByName})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
}

const BrandByID=async (req,res)=>{
    const {_id}=req.query

    try {
     await connect(process.env.MONGO_URL)
     const BrandById=await BrandFromModel.findOne({_id})
     res.json({BrandById})
        
    } catch (error) {
        req.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
}

const UpdateBrand=async(req,res)=>{
     // user se teeno cheezain main se jo bhi de kr krna chahy

     const {_id,BrandName,BrandImage}=req.body
     
    
     const filter = { _id };
     const update = { BrandName,BrandImage };
 
     try {
         //db connection
         await connect(process.env.MONGO_URL)  //connect hoga db idher
         await BrandFromModel.findOneAndUpdate(filter, update, {
             new: true
           });
 
         //   sara lany k liye
         const BrandUpdate= await BrandFromModel.find()
 
         res.json({
             message:"Updation Done Succesfully",
             BrandUpdate
         })
 
         
     } catch (error) {
         req.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
         })
         
     }
}

const DeleteBrand=async(req,res)=>{
    const {_id}=req.body

    try {
     await connect(process.env.MONGO_URL)   //mongo connection
     //pehly find to karo k wo chez db mai hai bhi ya nahi
     if (_id){
            await BrandFromModel.deleteOne({_id})      //api call hony pe delete hojayegi
            const AllBrands=await BrandFromModel.find()      //ek variable main baki ki mungwali
            res.status(200).json({
                message:"Deleted succesfully",
                AllBrands
            })
        } else{
            res.json({
                message:"The id you are trying to delete do not exists"
            })
        }
    }catch (error) {
        req.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
}



module.exports={CreateBrand, BrandByName, BrandByID, UpdateBrand, DeleteBrand}
