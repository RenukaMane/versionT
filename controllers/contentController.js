const appError = require('../utils/appError');
const content = require('../model/content');
const {uploadUsersPhoto} = require('./userImageUpload');

//const aws = require("aws-sdk");
const multer = require("multer");
//const multerS3 = require("multer-s3");


/*
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });
*/

const multerStorage = multer.diskStorage({
 
    
    destination: (req,file,cb) => {
        cb(null,'public/img/content');
    },

    filename: (req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null,`AngellaHills-${Date.now()}.${ext}`);
    } 


});

const uploads =  multer({
    storage: multerStorage
});

exports.contentUpload = (req, res, next) => {
  
  const uploadSingle = uploads.single('photo');


//   uploadSingle(req, res, async (err) => {
//     if (err)
//       return res.status(400).json({ success: false, message: err.message });

//     //await User.create({ photoUrl: req.file.location });

//     res.status(200).json({ data: req.file.location });
//   });

  console.log(req.file);
   
   res.status(200).json({
       status:'success',
       message:'Inside Content Upload'
       
   })
};


exports.getContent = async (req,res,next)=>{
 
    try{
    const cont = await content.findById(req.params.id);


    res.status(200).json({
        content:cont
    })
}catch(err){

    next(err);

}


}