const express = require('express');

const connectDB = require('./config/db');
const cors = require('cors');
//create an express app
const app = express();
//calling connectDb and hence this would return the connection
connectDB();
//set the middleware to parse data
app.use(express.json({ extended: false }));
app.use(cors());
app.use('/api/tasks', require('./routes/api/task'))
app.use('/api/users', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/budgets', require('./routes/api/budget'))
app.use('/api/accounts', require('./routes/api/account'))
app.use('/api/transactions', require('./routes/api/transaction'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server Started at ' + PORT);
})