const co      = require('co')
const fs      = require('fs')
const fse     = require('fs-extra')
const chalk   = require('chalk')
const path    = require('path')
const inquirer = require('inquirer');
const argv    = require('minimist')(process.argv.slice(2));
const generateFedJsDirectory = require('./util/generateFedJsDirectory')


const Commonds = {
  name: argv.name,
  port: argv.port,
  config: argv.config,
  scenes: argv.scenes, // 场景
  rebuild: argv.rebuild,
  server: argv.server,
  start: argv.start   // 纯粹启动Node端的服务
}

let configs_aotoo
let configs_apps

let localPath = process.cwd()
let configPath = path.join(localPath, 'aotoo.config.js')
// if (Commonds.config) {
//   configPath = Commonds.config
// }
if (fs.existsSync(configPath)) {
  configs_aotoo = require(configPath)
  configs_aotoo.localPath = localPath
  process.aotooConfigs = configs_aotoo
  configs_apps = configs_aotoo.apps && configs_aotoo.apps.length ? configs_aotoo.apps : generateFedJsDirectory(configs_aotoo)
  if (!configs_aotoo.apps.length) {
    if (!configs_apps.length) {
      inquirer.prompt([{
        type: 'input',
        name: 'createProject',
        message: '需要新建项目吗?',
        validate: function (value) {
          var re = /^[^\d]\w+/
          if(value === '') {
            console.log(chalk.yellow('\n您目前还没有建立任何项目'));
            process.exit()
          }
          return re.test(value) || '请正确输入项目名称，不要以数字开头的字符串'
        },
      }]).then(answers => {
        argv.name = false
        let newProject = path.join(__dirname, '../src', answers.createProject)
        if (configs_aotoo.src && fse.pathExistsSync(configs_aotoo.src)) {
          newProject = path.join(configs_aotoo.src, answers.createProject)
        } 
        fse.mkdirpSync(newProject)
        argv.name = [answers.createProject]
        configs_apps = generateFedJsDirectory(configs_aotoo)
        co(require('./main')(configs_apps, {
          localPath,
          configs_aotoo,
          argv
        }))
      });
    } else {
      if (!argv.name){
        const names = configs_apps.map(app=>{
          return app.name
        })
        inquirer.prompt([{
          type: 'list',
          name: 'projectName',
          message: '选择要启动的项目!',
          choices: names,
        }]).then(answers => {
          argv.name = [answers.projectName]
          co(require('./main')(configs_apps, {
            localPath,
            configs_aotoo,
            argv
          }))
        });
      }
    }
  } else {
    if (configs_apps.length) {
      co(require('./main')(configs_apps, {
        localPath,
        configs_aotoo,
        argv
      }))
    } 
  }
}