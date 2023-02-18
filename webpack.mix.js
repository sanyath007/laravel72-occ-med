const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.extend("addWebpackLoaders", (webpackConfig, loaderRules) => {
    loaderRules.forEach((loaderRule) => {
        webpackConfig.module.rules.push(loaderRule);
    });
});

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .addWebpackLoaders([
        {
            test: /\.(mp4|svg|jpe?g|gif)$/,
            use: [
                { 
                    loader: 'file-loader',            
                }
            ]
        }
    ]);
