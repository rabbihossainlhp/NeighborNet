require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');


const useRoute = require('./routes/routes');
const {baseMiddlewares} = require('./middlewares/base.middleware')




const app = express();


//middleares using from here
baseMiddlewares(app);

//all routes handeled from here
useRoute(app);

app.get('/',(req,res)=>{
    res.send("HEY jonogon ki obostha");
})




const Port = process.env.PORT || 5003;

mongoose.connect(process.env.MONGODB_URI).
    then(()=>{
        console.log("Connected DB Successfully");
        console.log("Starting Server....");
        
        app.listen(Port,()=>{
            console.log(`Server is running on http://localhost:${Port}`);
        })
    }).catch(error=>{
        console.log("Database connection failed!!");
        console.log(error);
    }
);

