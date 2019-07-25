const mongoose = require('mongoose');
const Schema =mongoose.Schema;

//id,name and description
const CategoriesSchema = new mongoose.Schema({
    //adding user to our model -> class 4-> authenticating and registering a user.
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
   name: {
       type: String,
       required:true
   },
   desc: {
       type:String
   }
   

});

module.exports = Task = mongoose.model('category', CategoriesSchema);