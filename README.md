# ES2015(ES6) + Angular 1.x Webpack Seed

## Usage:

1. run `git clone https://github.com/why520crazy/angular1.x-webpack-seed`;

1. cd folder angular1.x-webpack-seed , run `npm install`;

1. run `npm start` start webpack dev server, then visit `http://localhost:7070`

## Features

1. 使用 ES6 Modules 进行 Angular 1.x 的模块化开发；
1. 使用全组件化开发一个简单的 Angular 1.x 单页项目；
1. 使用 Webpack 合并处理 JS，CSS，LESS，Image，HTML 等一切静态资源；
1. 包管理工具使用 NPM，任务的启动脚本使用 NPM Scripts；
1. 使用 Webpack 的 CommonsChunkPlugin 将引用的第三方类库单独打包成一个独立的 bundle，并把多个入口公用的JS抽取出独立的 bundle；
1. 使用 HtmlWebpackPlugin 插件生成入口的HTML文件，并把打包之后的JS和CSS引入到HTML中，不需要手动添加 scripts 标签和 style link；
1. 使用 ExtractTextPlugin 插件把 CSS 抽取成独立的文件，当然你也可以不这么做，直接放在 JS 中；
1. 使用 postcss 处理样式的兼容性问题，autoprefixer 自动追加前缀等。

## Build

Run `npm run build` will auto build files to folder www.


you can use [nginx](http://nginx.org) or
[http-server](https://github.com/indexzero/http-server) publish folder www to production server,
