const express = require('express');
const router = express.Router();

module.exports = function(){
    router.get('/',(req,res)=>{
      res.send('index');
    });

    router.get('/nosotros',(req,res)=>{
        res.send('hola');
      });

    return router;
}