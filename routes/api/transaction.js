const express = require('express');
const config = require('config');

const Task = require('../../models/Task');
const Transaction = require('../../models/Transaction');
const Account = require('../../models/Account');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

router.post('/', auth, async(req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });
        const account = await Account.findOne({ _id: req.body.account });
        if (req.body.type === 'withdrawl') {
            account.amount = account.amount - (+req.body.value);
        }
        if (req.body.type === 'deposit') {
            account.amount = account.amount + (+req.body.value);
        }
        const newTransaction = new Transaction({
            user: req.user.id,
            account: req.body.account,
            task: req.body.task,
            type: req.body.type,
            value: req.body.value
        });
        const transaction2 = await newTransaction.save();
        const account2 = await account.save();
        res.send(transaction2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

});

router.get('/', auth, async(req, res) => {
    try {
        let Transactions = await Transaction.find({ user: req.user.id });
        // for (var i = 0; i < Transactions.length; i++) {
        //     if (Transactions[i].task.toString()) {
        //         Transactions[i].task = (await Task.findOne({ _id: Transactions[i].task.toString() })).toJSON();
        //     }
        //     if (Transactions[i].account.toString()) {
        //         Transactions[i].account = (await Task.findOne({ _id: Transactions[i].account.toString() })).toJSON();
        //     }
        // }
        res.send(Transactions);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

router.get('/:id', auth, async(req, res) => {
    try {
        const Transactions = await Transaction.findOne({ _id: req.params.id });
        res.send(Transactions);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

router.delete('/:id', auth, async(req, res) => {
    try {
        await Transaction.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Transaction deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;