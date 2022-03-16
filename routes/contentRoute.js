const express = require("express");
const contentRouter = express.Router();
const content = require('../model/content');
const contentController = require('../controllers/contentController')
const authController = require('../controllers/authController')

contentRouter.get('/:id',authController.protect,contentController.getContent);

contentRouter.post('/Insert',async (req,res,next)=>{

   
   
    const cont = await content.create({
        name:"Place2",
        Images:['D:\VersionT\BackEnd-Node\versionT-BackEnd\public\img\content\tour-1-1.jpg']
    })

    res.status(200).json({
        cont
    })
})

contentRouter.post('/Upload-Content',contentController.contentUpload);

module.exports = contentRouter;