const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    // type: {
    //     type: String,
    //     enum: ['saving', 'sharing', 'chequing']
    // },
    type: {
        type: String
    },
    amount: {
        type: Number
    }
});

module.exports = Account = mongoose.model('account', AccountSchema);