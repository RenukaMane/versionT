const multer = require ('multer');


const multerStorage = multer.diskStorage({
 
    
    destination: (req,file,cb) => {
        cb(null,'public/img/users');
    },

    filename: (req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null,`user-${req.body.email_id}-${Date.now()}.${ext}`);
    } 


});



const uploads = multer({
    storage: multerStorage
});




exports.uploadUsersPhoto = uploads.single('photo');


