const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const noteRoutes = require('./routes/notes');
const planRoutes = require('./routes/plans');
 
const app = express(); 
app.use(express.json());
app.use(cors());


app.use('/user',userRoutes);
app.use('/project',projectRoutes);
app.use('/task',taskRoutes);
app.use('/note',noteRoutes);
app.use('/plan',planRoutes);

mongoose.connect(process.env.URL).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port 3001')
    })
}).catch(err=>console.log(err));

