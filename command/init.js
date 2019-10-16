'use strict'

const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')

module.exports = () => {
  // generator函数
  co(function *(){
    // 处理用户输入的交互
    let name = yield prompt('项目名：')
    let gitUrl = yield prompt('Git地址：')
    let branch = yield prompt('分支是：')

    let sh = `git clone ${gitUrl} ${name} && cd ${name} && git checkout ${branch}`

    console.log(chalk.white('\n 开始构建...'))

    exec(sh, (error, stdout, stderr) => {
      if(error){
        console.log(error)
        process.exit()
      }

      console.log(chalk.green('\n √ 构建完成!'))
      console.log(`\n cd ${name} && npm install \n`)
      process.exit()
    })
  })
}