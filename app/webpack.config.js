const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const packageFile = require('./package.json');

module.exports = (env, args) => {
    let production = false;

    if (args && args.mode === 'production') {
        production = true;
        console.log('== Production mode');
    } else {
        console.log('== Development mode');
    }

    return {
        entry: {
            'rough-chart': './source/index.tsx',
            'rough-chart-shortcode': './source/shortcode.ts',
        },
        output: {
            path: path.resolve('./build'),
            filename: './js/[name].js',
            chunkFilename: './js/rough-chart.[id].chunk.js',
        },
        target: 'web',
        devtool: production ? false : 'source-map',
        optimization: {
            minimize: production,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.txt'],
        },
        module: {
            rules: [
                {
                    test: /\.[t|j]sx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                // app main .less file
                {
                    test: /\.(less|css)$/i,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'less-loader',
                    ],
                },
            ],
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            contentBase: './build',
            compress: true,
            port: 3030,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './source/index.ejs',
                filename: './index.html',
                appVersion: packageFile.version,
            }),

            new CleanWebpackPlugin({
                verbose: true,
                dry: false,
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!.gitignore',
                ],
            }),
        ],
    };
};
