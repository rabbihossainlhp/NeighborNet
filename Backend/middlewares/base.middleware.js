const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Middlewares = [
        morgan('dev'),
        express.json(),
        cors,
]

const baseMiddlewares = (app) =>{
    Middlewares.map(middleware=>{
        app.use(middleware);
    });
};


module.exports = {baseMiddlewares};