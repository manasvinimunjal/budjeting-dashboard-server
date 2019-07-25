const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({

    type: {
        type: String,
        enum: ['withdrawl', 'deposit'],
        required: true
    },
    task: {
        type: [Schema.Types.ObjectId],
        ref: 'task'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    },

    value: {
        type: Number,
        required: true
    }
});

module.exports = Task = mongoose.model('transaction', TransactionSchema);