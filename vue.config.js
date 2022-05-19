const port = process.env.port || process.env.npm_config_port || 8080 // dev port
module.exports = {
    publicPath: './',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        host: "0.0.0.0",
        port: port,
        proxy: {
            '/gov': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/gov': '/gov'
                }
            },
            '/mobile': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/mobile': '/mobile'
                }
            },
            '/permit': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/permit': '/permit'
                }
            },
            '/traffic': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/traffic': '/traffic'
                }
            }
        }
    },
    chainWebpack(config) {
        config.plugin('html').tap(args => {
            // if(process.env.VUE_APP_BASE_API.indexOf('http://172.21.112.65:8083') !== -1){ //演示环境
            //     args[0].mapUrl = 'http://10.146.1.53:9018'
            //     args[0].mapFileName = 'LongMap1'
            // }else {
            //     //生产环境
            //     args[0].mapUrl = 'http://172.21.112.113:9018'
            //     args[0].mapFileName = 'LongMap'
            // }
            return args;
        })
    }
}