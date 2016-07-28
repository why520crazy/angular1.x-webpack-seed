'use strict';

// Modules
const webpack = require('webpack');
const helpers = require('./webpack/helpers');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// set the environment by npm lifecycle event , `npm run build` npm_lifecycle_event is build
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

module.exports = function () {
    const config = {
        context: helpers.root("./src"),
        entry  : {
            'vendor'   : ['angular', 'angular-route'],
            'app'      : './app.js',
            'app.other': './app.other.js'
        },
        output : {
            path         : helpers.root('./www'),
            publicPath   : '/',
            //library      : '[name]_[hash:8]',
            filename     : isProd ? '[name].[hash:8].js' : '[name].bundle.js',
            chunkFilename: isProd ? '[name].[hash:8].js' : '[name].bundle.js'
            // publish to cdn
            // publicPath: "http://cdn.example.com/[hash:8]/",
            // filename     : isProd ? '[hash:8]/[name].js' : '[name].bundle.js',
            // chunkFilename: isProd ? '[hash:8]/[name].js' : '[name].bundle.js'
        },

        /*
         * Options affecting the normal modules.
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module: {

            /*
             * An array of applied pre and post loaders.
             *
             * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
             */
            preLoaders: [

                /*
                 * Source map loader support for *.js files
                 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
                 *
                 * See: https://github.com/webpack/source-map-loader
                 */
                {
                    test   : /\.js$/,
                    loader : 'source-map-loader',
                    exclude: [
                        // these packages have problems with their sourcemaps
                        helpers.root('node_modules/angular'),
                        helpers.root('node_modules/angular-route')
                    ]
                }

            ],

            /*
             * An array of automatically applied loaders.
             *
             * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
             * This means they are not resolved relative to the configuration file.
             *
             * See: http://webpack.github.io/docs/configuration.html#module-loaders
             */
            loaders: [
                // JS LOADER
                // Reference: https://github.com/babel/babel-loader
                // Compiles ES6 and ES7 into ES5 code
                {
                    test: /\.js$/, loaders: ['babel', 'eslint-loader'], exclude: /node_modules/
                },
                /*
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test  : /\.json$/,
                    loader: 'json-loader'
                },
                /*
                 * Reference https://github.com/webpack/less-loader
                 */
                {
                    test   : /\.less$/,
                    exclude: helpers.root("./src/css/main.less"),
                    loader : ExtractTextPlugin.extract("css!postcss!less")
                },
                //{test: /\.less$/, loader: extractLESS.extract(['css', 'postcss!less'])},
                //all css required in src/app files will be merged in js files
                {
                    test   : /\.less/,
                    include: helpers.root("./src/css/main.less"),
                    loader : 'style!css!postcss!less'
                },

                /*
                 * to string and css loader support for *.css files
                 * Returns file content as string
                 *
                 */
                // {
                //     test   : /\.css$/,
                //     loaders: ['to-string-loader', 'css-loader']
                // },

                // support for .html as raw text
                // todo: change the loader to something that adds a hash to images
                //{test: /\.html$/, loader: 'raw'},

                // HTML LOADER
                // Reference: https://github.com/webpack/html-loader
                // Allow loading html through js
                {test: /\.html$/, loader: 'html?root=/&attrs=img:src img:data-src link:href'},

                // FILE LOADER
                // Reference: https://github.com/webpack/file-loader
                // Copy resource files to output
                {
                    test  : /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i,
                    loader: 'file?name=images/[name].[ext]?[hash]'
                }

            ]

        },

        /**
         * Plugins
         * Reference: http://webpack.github.io/docs/configuration.html#plugins
         * List: http://webpack.github.io/docs/list-of-plugins.html
         */
        plugins: [
            //vendor
            new webpack.optimize.CommonsChunkPlugin({
                name  : 'commons.chunk',
                chunks: ['app', 'app.other']
            }),
            new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'vendor.[hash:8].js' : 'vendor.bundle.js'),
            // new webpack.DllPlugin({
            //     path   : 'manifest.json',
            //     name   : "[name]_[hash:8]",
            //     context: helpers.root(".")
            // }),
            // Reference: https://github.com/ampedandwired/html-webpack-plugin
            // Render index.html
            new HtmlWebpackPlugin({
                template      : helpers.root('./src/index.html'),
                //inject        : 'body',
                chunks        : ['commons.chunk', 'vendor', 'app'],
                chunksSortMode: 'dependency'
            }),
            new HtmlWebpackPlugin({
                filename      : "app.other.html",
                template      : helpers.root('./src/index.html'),
                //inject        : 'body',
                chunks        : ['commons.chunk.js', 'vendor', 'app.other'],
                chunksSortMode: 'dependency'
            }),
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files
            new ExtractTextPlugin(isProd ? '[name].[hash:8].css' : '[name].css')
            //new RenamePlugin()
        ],

        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer
         */
        postcss: [
            autoprefixer({
                browsers: ['last 2 version']
            })
        ],

        /**
         * Dev server configuration
         * Reference: http://webpack.github.io/docs/configuration.html#devserver
         * Reference: http://webpack.github.io/docs/webpack-dev-server.html
         */
        devServer: {
            // Base path for the serve content.
            contentBase: 'src',
            // Minimize output infomation
            //stats      : 'minimal',
            // Server port
            port       : 7070
        }
    };

    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin()
        );
    }

    if (isProd) {
        //config.devtool = 'source-map';
    } else {
        config.devtool = 'source-map';
    }
    // add debug messages
    config.debug = !isProd || !isTest;

    return config;
}();

