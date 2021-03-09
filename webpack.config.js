/*
 * @Description: webpack配置文件
 * @Purpose: Powered By Fantastic Artwork Vue.js @ Evan You.
 * @Version: 2.6.1
 * @Author: PONY ZHANG
 * @Date: 2021-03-08 13:03:42
 * @LastEditors: PONY ZHANG
 * @LastEditTime: 2021-03-09 23:27:57
 * @motto: 「あなたに逢えなくなって、錆びた時計と泣いたけど…」
 * @topic: # Carry Your World #
 * @Github: Epic-Deno
 * @Blogs: https://epic-deno.github.io/deno.github.io/
 * @Pony: http://scorpionz.gitee.io/pony-zhang/
 * @Juejin: https://juejin.im/user/1151943917713623
 * @Zhihu: https://www.zhihu.com/people/zhang-zhen-36-44
 */
module.exports = {
    entry: {
        main: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]],
                    }
                }
            }
        ]
    },
    mode: 'development',
    optimization: {
        minimize: false,
    },
}