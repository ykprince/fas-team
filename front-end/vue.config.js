module.exports = {
  outputDir: '../src/main/resources/static', // 빌드 타겟 디렉토리
  devServer: {
    proxy: {
      proxy: 'http://localhost:8080'
    },
    chainWebpack: config => {
      const svgRule = config.module.rule('svg')
      svgRule.uses.clear()
      svgRule.use('vue-svg-loader').loader('vue-svg-loader')
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/main.scss";'
      }
    }
  }
}
