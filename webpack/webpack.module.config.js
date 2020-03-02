/*
 * @Author: chen_huang
 * @Date: 2020-02-29 17:05:28
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-03-02 09:56:33
 * @Description:
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const { assetsPath } = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const pathResolve = pathName => path.resolve(__dirname, pathName);
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: "production",
  // mode: "development",
  // devtool: "cheap-module-source-map",
  entry: {
    moduleA: path.resolve(__dirname, "../src/moduleA/jobs/entry.js"),
    routes: path.resolve(__dirname, "../src/moduleA/jobs/route.js")
  },

  output: {
    path: path.resolve(__dirname, "../moduleA"),
    publicPath: "/"
    // filename: 'js/[name].[hash:8].js'
  },

  resolve: {
    extensions: [".js", ".vue", ".json", ".png", ".gif", ".svg"],
    alias: {
      public: pathResolve("../src/app/public"),
      "@": pathResolve("../src/"),
      // 这行必须 默认导入vue引用的vue模块下的vue.common.js
      // 不包含编译vue组件的loader 需要引用vue.js = vue.common + vue.compiler
      vue: "vue/dist/vue.esm.js"
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          isProd
            ? {
                loader: MiniCssExtractPlugin.loader
                // options: {
                //   publicPath: './css/'
                // }
              }
            : "vue-style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.vue/,
        use: ["vue-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 1,
              name: assetsPath("images/[name].[ext]?[hash:8]")
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new FriendlyErrorsPlugin(),
    // 解析.vue格式的文件
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "主页",
      template: path.resolve(__dirname, "../src/app/public/index.html"),
      filename: "index.html"
      // 配置多页面 指定每个模块需要引用的模块
      // chunks: []
    }),
    new ManifestPlugin()
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },

  devServer: {
    // 在路由history模式下，请求页面地址没有的话默认返回index.html
    // 这样达到支持history模式
    historyApiFallback: true,
    inline: true,
    // 启动和保存只有错误和警告会显示
    noInfo: true,
    // contentBase: path.join(__dirname, "../dist"),
    host: "localhost",
    port: 3001,
    https: false,
    compress: false,
    openPage: "",
    open: true,
    hot: true,
    clientLogLevel: "none",
    // 指定可以通过url+publicPath方式访问静态资源
    publicPath: "/",
    headers: {
      "Access-Control-Request-Methods": "*",
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      // '/api': {
      //   target: 'https://other-server.example.com',
      //   // 跳过https证书不安全提示
      //   secure: false
      // }
    }
  }
};
