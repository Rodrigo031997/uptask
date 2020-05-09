const path = require('path');//permite acceder a los archivos ubicados en la carpeta public
const webpack = require('webpack');


module.exports ={
    entry: './public/js/app.js',
    output : {
        filename : 'bundle.js',
        path: path.join(__dirname,'./public/dist')
    },
    module:{
        rules :[
            {
                //js
             test : /\.m?js$/,
             use:{
                 loader:'babel-loader',
                 options:{
                     presets:['@babel/preset-env']
                 }
             }
            }
        ]
    }
}