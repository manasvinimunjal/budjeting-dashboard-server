const express = require('express');
const config = require('config');

const Task = require('../../models/Task');
const Account = require('../../models/Account');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

router.post('/', auth, async(req, res) => {
    try {
        const accounts = await Account.find({ user: req.user.id });
        // if (accounts.length >= 3) {
        //     return res.status(400).json({
        //         msg: "Max account limit reached"
        //     });
        // }

        // const accountTypeAlreadyExist = accounts.map(account => account.type);
        // if (accountTypeAlreadyExist.indexOf(req.body.type) != -1) {
        //     return res.status(400).json({
        //         msg: "Account Type Already Exists"
        //     });
        // }

        const newAccout = new Account({
            user: req.user.id,
            type: req.body.type,
            amount: req.body.amount
        });
        const Account2 = await newAccout.save();
        res.send(Account2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

});

router.get('/', auth, async(req, res) => {
    try {

        const Account2 = await Account.find({ user: req.user.id });
        res.send(Account2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

})

router.get('/:id', auth, async(req, res) => {
    try {

        const Account2 = await Account.findOne({ _id: req.params.id });
        res.send(Account2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

})
router.delete('/:id', auth, async(req, res) => {
    try {
        await Account.findOneAndRemove({
            _id: req.params.id
        });
        res.json({ msg: 'Account deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// router.put('/:id', auth, async(req, res) => {
//     try {
//         let Account2 = await Account.findOne({
//             task: req.task.id,
//             _id: req.body.id
//         });

//         if (!Account2) {
//             return res.status(404).send('Account not found');
//         }

//         // Update
//         const { id, saving, sharing, chequing } = req.body;
//         Tasks2 = await Task.findOneAndUpdate({ _id: id }, { description: description, title: title, status: status });


//         res.send(Tasks2);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server error');
//     }
// });
module.exports = router;