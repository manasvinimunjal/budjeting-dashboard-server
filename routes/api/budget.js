const express = require('express');
const config = require('config');

const Task = require('../../models/Task');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Budget = require('../../models/Budget');

const router = express.Router();

router.post('/', auth, async(req, res) => {
    try {
        const newBudget = new Budget({

            user: req.user.id,
            task: req.body.taskId,
            balance: req.body.balance,
            monthlyIncome: req.body.monthlyIncome,
            savings: req.body.savings
        });

        const task1 = await Task.findOne({ _id: req.body.taskId })
        const expenditure = task1.rent + task1.groceries + task1.carInsurance + task1.travel + task1.misc;
        newBudget.savings = newBudget.monthlyIncome - expenditure;
        const percentSavings = ((newBudget.monthlyIncome - newBudget.savings) / newBudget.monthlyIncome) * 100;
        const savedBudget = await newBudget.save();
        savedBudget.expenditure = expenditure;
        savedBudget.percentSavings = percentSavings;
        res.json({
            '_id': savedBudget._id,
            'user': savedBudget.user,
            'task': savedBudget.task,
            'balance': savedBudget.balance,
            'monthlyIncome': savedBudget.monthlyIncome,
            'savings': newBudget.savings,
            'expenditure': expenditure,
            'percentageSavings': percentSavings
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

});

router.get('/:id', auth, async(req, res) => {
    try {
        //adding user:req.user.id as the parameter-> class 4
        const budget = await Budget.findOne({ _id: req.params.id });
        const task = await Task.findOne({ _id: budget.task });

        const expenditure = task.rent + task.groceries + task.carInsurance + task.travel + task.misc;
        const percentSavings = ((budget.monthlyIncome - budget.savings) / budget.monthlyIncome) * 100;
        budget.expenditure = expenditure;
        budget.percentSavings = percentSavings;
        res.json(budget);


    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

})

module.exports = router;