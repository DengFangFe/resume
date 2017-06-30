var path = require('path');
var webpack = require('webpack');

/*extract-text-webpack-plugin 插件 将样式提取到单独的css文件中，如果没有它的话，webpack会将css打包到js当中*/
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*html-webpack-plugin插件。webpack中生成的HTML插件，可以将打包好的文件动态加载到html中 */
var HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './entry.js', //入口配置文件，可以有多个文件
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板，样式，脚本。图片等资源的路径配置都相对于它，，名字可以随便起
        publicPath: './',
        filename: 'bundle.js', //每个页面对应的主js的生成配置，如app.js 打包之后 app.bundle.js
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: 'babel-loader',
            options: {
                    plugins: [require('babel-plugin-transform-es2015-arrow-functions')],
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        }, {
            test: /\.(png|jpg|gif|cur)$/,
            loader: 'url-loader?limit=8192&name=[hash].[ext]',
        }, {
            //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
            //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
            test: /\.html$/,
            loader: "html-loader"
        }, {
            //文件加载器，处理文件静态资源
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=[name].[ext]',
        }],
    },
    plugins: [
       new webpack.ProvidePlugin({ //加载jq
       		$: path.join(__dirname, '/asset/js/jquery.min'),
       }),
       new ExtractTextPlugin('css/[name].css'),
       // new webpack.optimize.CommonsChunkPlugin('common.js'),
       new HtmlWepackPlugin({
       	 filename:'../index.html',
       	 template:'./index2.html',
       	 inject:true,
       	 hash:true, //为静态资源生成hash值
       	 minify:{//压缩HTML文件
       	 	removeComments:true,//移除HTML中的注释
       	 	collaspseWhitespace:false //删除空白符和换行符
       	 }

       }),
       new webpack.HotModuleReplacementPlugin() //热加载
    ],
    // devServer:{
    // 	contentBase:'/',
    // 	host:'localhost',
    // 	port:3200, //监听3200端口
    // 	inline:true,//可以监控js变化
    // 	hot:true,//热启动
    // }

}
