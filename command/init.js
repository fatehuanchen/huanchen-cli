'use strict'

// const exec = require('child_process').exec
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')


async function nextSh(sh1, sh2) {
  console.log(chalk.white('\n 开始拉取代码...'))
  const { error } = await exec(sh1);
  if(error) {
    console.log(error)
    process.exit()
  }else {
    console.log(chalk.green('\n √ 拉取代码成功!'))
    console.log(chalk.green('\n 开始install...'))
  }
  const { error : error1  } = await exec(sh2);
  if(error1) {
    console.log(error1)
    process.exit()
  }else {
    console.log(chalk.green('\n √ 构建完成!'))
    process.exit()  
  } 
}

module.exports = () => {
  // generator函数
   co(function *(){
    // 处理用户输入的交互
    let name = yield prompt('项目名：')
    let gitUrl = yield prompt('Git地址：')
    let branch = yield prompt('分支是(默认是master)：') 
    let install = yield prompt('使用yarn还是npm或是其他进行install(默认是npm)：')

    branch = branch || 'master'

    install = install || 'npm'

    let sh1 = `git clone -b ${branch} ${gitUrl} ${name}`
    let sh2 = `cd ${name} && ${install} install`

    console.log(chalk.white('\n 开始拉取代码...'))

    exec(sh1, (error) => {
      if(error){
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ 拉取代码成功!'))
      console.log(chalk.white('\n 开始install...'))

      exec(sh2, (error) => {
        if(error){
          console.log(error)
          process.exit()
        }
        console.log(chalk.green('\n √ 构建完成!'))
        process.exit() 
      })

    })

    // nextSh(sh1, sh2)
  })
}