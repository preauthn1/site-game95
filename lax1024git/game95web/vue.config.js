const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    productionSourceMap: process.env.NODE_ENV === 'production'?false:true,
    publicPath: '',
    outputDir: 'dist',
    lintOnSave: false,
    pwa: {
        assetsVersion: '1.3',
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production'){
            config.optimization = {
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                // 去掉注释内容
                                // comments: false,
                                // 移除 console 代码(包含所有 console 方法，如 log,debug,info...)
                                drop_console : true,
                            },
                            output: {
                                // 最简化输出
                                // comments: false,
                            },
                        },
                        extractComments: false, // 是否将注释提取到单独的文件中
                    }),
                ],
            };
            const _plugins = [
                new CompressionPlugin({
                    filename: '[path][base].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
                    algorithm: 'gzip', // 使用gzip压缩
                    test: /\.js$|\.css$/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    minRatio: 1, // 压缩率小于1才会压缩
                    deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
                })
            ];
            config.plugins = [...config.plugins, ..._plugins];

        }
    },
    chainWebpack: (config) => {
        config.plugins.delete('prefetch') // TODO: need test
        config.when(process.env.NODE_ENV !== 'development', config => {
            // config
            //     .plugin('ScriptExtHtmlWebpackPlugin')
            //     .after('html')
            //     .use('script-ext-html-webpack-plugin', [{
            //         // `runtime` must same as runtimeChunk name. default is `runtime`
            //         inline: /runtime\..*\.js$/
            //     }])
            //     .end()
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                        priority: 20 // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
            config.optimization.runtimeChunk('single')
        })
        // config.module
        //     .rule('images')
        //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({
        //         // bypassOnDebug: true
        //         mozjpeg: { progressive: true, quality: 65 },
        //         optipng: { enabled: false },
        //         pngquant: { quality: [0.8, 0.9], speed: 4 },
        //         gifsicle: { interlaced: false },
        //         webp: { quality: 75 }
        //     })
        //     .end()
    }
}
