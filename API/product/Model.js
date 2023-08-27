const {Schema, model}=require('mongoose')

const ProductSchema=new Schema({
    ProductName:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:Number,
        required:true
    },
    ProductCategory:{
        type:String,
        required:true
    },
    ProductBrand:{
        type:String,
        required:true
    },
    ProductThumbnail:{
        type:String,
        required:true
    },
    ProductDescription:{
        type:String,
        required:true
    }
    ,
    ProductImageArray:{
        type:[String],
        required:true
    }

})

const ProductFromModel=model('product',ProductSchema)
module.exports={ProductFromModel}