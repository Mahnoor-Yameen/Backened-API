const express=require('express')
const router=express.Router()
const {CreateCategory, CategoryByName, CategoryByID, UpdateCategory, DeleteCategory}=require('./Controller')


router.post('/create-category',CreateCategory)
router.get('/get-category-by-name',CategoryByName)
router.get('/get-category-by-id',CategoryByID)
router.put('/update-category',UpdateCategory)
router.delete('/delete-category',DeleteCategory)


module.exports=router