 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js'
   },
   plugins: [
     new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
       title: 'Production', 
       template: '../build/index.html'
     })
   ],
   output: {
     filename: 'cloud.bundle.js',
     path: path.join(__dirname , 'build')
   }, 
   module :{
    rules:[
        {
            test: /\.js$/ , 
            exclude: /node_modules/ , 
            use:{
                loader: 'babel-loader'
            }, 
           
        }, 
      {  test:/\.css$/,
        use:
             ['css-loader' , 'style-loader' , 'postcss-loader' , 'bootstrap']
        
    }
    ]
},
 };