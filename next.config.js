/*
 * @Author: yanhengfu 1315007322@qq.com
 * @Date: 2022-11-06 22:49:43
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-12-08 20:22:53
 * @FilePath: \part-time-lindacars\next.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");

const isDevMode = process.env.NODE_ENV === 'development'
// console.log('isDevMode: ',isDevMode)
const baseUrl = isDevMode ? 'http://localhost:3000/api-text' : 'https://api.daykarkal.com/api/'
const clientUrl = isDevMode ? 'http://localhost:3000/api-text' : 'http://www.ywiesmetal.com/api'


const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-text/:path*',
        destination: 'https://api.daykarkal.com/api/:path*',
      },
    ]
  },
  lessLoaderOptions: {
    lessOptions: {
      
    }
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    serverBaseUrl: baseUrl,
    clientUrl: clientUrl
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve("url-loader"),
      options: {
        limit: 10000,
        name: "static/media/[name].[hash:8].[ext]",
      },

    });
    return config;
  }

}

module.exports = withLess(nextConfig) 
