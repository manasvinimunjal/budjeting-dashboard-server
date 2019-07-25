const express = require('express');
const config = require('config');

const Task = require('../../models/Task');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();


router.post('/', auth, async(req, res) => {
    try {
        const newTask = new Task({

            user: req.user.id,
            name: req.body.name,
            desc: req.body.desc
                // rent: req.body.rent,
                // groceries: req.body.groceries,
                // carInsurance: req.body.carInsurance,
                // travel: req.body.travel,
                // misc: req.body.misc
        });
        const Task2 = await newTask.save();
        res.send(Task2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

});

router.get('/', auth, async(req, res) => {
        try {
            //adding user:req.user.id as the parameter-> class 4
            const Tasks2 = await Task.find({ user: req.user.id });
            res.send(Tasks2);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("server error");
        }

    })
    //modifying findbyid to findbyone -> class 4
router.get('/:id', auth, async(req, res) => {
    try {

        const Tasks2 = await Task.findOne({ user: req.user.id, _id: req.params.id });
        res.send(Tasks2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

})
router.delete('/:id', auth, async(req, res) => {
    try {
        // Remove task

        //await Task.findByIdAndRemove({ _id: req.body.id });
        await Task.findOneAndRemove({ user: req.user.id, _id: req.body.id });

        res.json({ msg: 'Task deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// router.put('/:id', auth, async(req, res) => {
//     try {
//         let Tasks2 = await Task.findOne({
//             user: req.user.id,
//             _id: req.body.id
//         });

//         if (!Tasks2) {
//             return res.status(404).send('Task not found');
//         }

//         // Update
//         const { id, title, description, status } = req.body;
//         Tasks2 = await Task.findOneAndUpdate({ _id: id }, { description: description, title: title, status: status });


//         res.send(Tasks2);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server error');
//     }
// });
module.exports = router;