const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new mongoose.Schema({
    //adding user to our model -> class 4-> authenticating and registering a user.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    },
    balance: {
        type: Number
    },
    monthlyIncome: {
        type: Number
    },
    savings: {
        type: Number
    }

});

module.exports = Budget = mongoose.model('budget', CategoriesSchema);