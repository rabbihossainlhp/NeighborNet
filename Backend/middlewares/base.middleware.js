const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const Middlewares = [
        morgan('dev'),
        express.json(),
        cors({
            origin:'http://localhost:5173',
            credentials:true
        }),
        cookieParser(),
]

const baseMiddlewares = (app) =>{
    Middlewares.map(middleware=>{
        app.use(middleware);
    });
};


module.exports = {baseMiddlewares};