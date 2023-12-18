const HtmlWebpackPlugin = require('html-webpack-plugin')
const childProcess = require('child_process')
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')
const version = branch.split('/')[1]

class HotLoad {
  apply(compiler) {
    compiler.hooks.beforeRun.tap('UpdateVersion', (compilation) => {
      compilation.options.output.publicPath = `./${version}/`
    })
  }
}

module.exports = HotLoad

module.exports = {
  plugins: [new HotLoad()],
}
