const dotenv = require('dotenv');
dotenv.config({path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');


const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb+srv://renuka_mane:India123$@versiont.xw077.mongodb.net/VersionT?retryWrites=true&w=majority').then(()=>{
    console.log("DB connection successful");

});




app.listen(PORT,()=>{

    console.log(`Listening on port ${PORT}`)
});
