require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./utils/db.utils');

const userRoutes = require('./routes/user.routes');
const passwordRoutes = require('./routes/password.routes');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, PATCH',
    credentials: true
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/userAuth',userRoutes);
app.use('/api/password',passwordRoutes);


connectDB()
.then(function(){
    app.listen(process.env.PORT,function(){
        console.log('⛭ server started ⛭');
    });
})
.catch(function(e){
    console.log('Error ',e);
});