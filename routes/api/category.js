const express = require('express');
const config = require('config');

const Task = require('../../models/Task');

const auth = require('../../middleware/auth');


const router = express.Router();

router.get('/', (req, res) => {
    try {
        Task.find()
            .sort({ name: -1 })
            .then(category => res.json(category))
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

})


router.post('/', async(req, res) => {
    try {
        const newTask = new Task({
            name: req.body.name,
            desc: req.body.desc,
        });
        const Task2 = await newTask.save();

        res.send(Task2);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

});

router.delete('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(category => category.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});
module.exports = router;