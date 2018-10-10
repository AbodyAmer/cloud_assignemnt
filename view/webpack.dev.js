 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
     
        historyApiFallback: true,
        inline: true, 
        contentBase: './dist', 
        port: 8080, 
        proxy: { "/api/**": { target: 'http://localhost:3000', secure: false }  }
   }
 });