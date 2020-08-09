module.exports = {
  pwa: {
    name: "",
    themeColor: "#D0021B",
  },
  publicPath: "./",
  outputDir: "./dist",
  assetsDir: "./assets",
  runtimeCompiler: true,
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  parallel: undefined,
  lintOnSave: false,
  filenameHashing: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/_variable.scss";`,
      },
    },
  },
  pages: {
    // page 的入口
    index: {
      entry: "src/bag/Index/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "首页",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
      // 当使用只有入口的字符串格式时，
      // 模板会被推导为 `public/subpage.html`
      // 并且如果找不到的话，就回退到 `public/index.html`。
      // 输出文件名会被推导为 `subpage.html`。
      // subpage: 'src/subpage/userRecharge_index.js'
    },
  },
  devServer: {
    open: process.platform === "vue",
    host: "192.168.0.105",
    port: 8080,
    https: false,
    hotOnly: false,
  },
};
