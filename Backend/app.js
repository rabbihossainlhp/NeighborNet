require('dotenv');
const express = require('express');


const useRoute = require('./routes/routes');




const app = express();

const Port = process.env.PORT || 5003;


useRoute(app);


app.get('/',(req,res)=>{
    res.send("HEY jonogon ki obostha");
})

app.listen(Port,()=>{
    console.log("Server is running on http://localhost:5003")
})