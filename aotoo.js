#!/usr/bin/env node
var fs = require('fs-extra')
var path = require('path')
var globby = require('globby')
var program = require('commander')
var inquirer = require('inquirer')
var shelljs = require('shelljs')

var chalk = require('chalk')
var argv = require('minimist')(process.argv.slice(2));


const log = console.log;
const emptyJsFile = path.join(__dirname, 'build/lib/src/empty.js')
const projectBabelFile = path.join(__dirname, 'build/lib/babelrc')
const projectGitIgnoreFile = path.join(__dirname, 'build/lib/gitignore')
const projectPackageJson = path.join(__dirname, 'build/lib/package.json')
const _aotooConfigContent = 
`
const path = require('path')
const pakg = require('./package.json')
const ROOT = __dirname
const version = pakg.version
module.exports = {
  version: version,
  mode: process.env.NODE_ENV,
  src : path.join(__dirname, 'src'),
  apps: [
    {
      name: 'aotooSample',
      startup: true,
      src: path.join(ROOT, 'src/aotooSample'),
      host: 'localhost',
      port: 8300
    }
  ]
}
`

function initDemoSource(targetDir) {
  const localDemoSourcePath = path.join(__dirname, 'src')
  if (fs.pathExistsSync(localDemoSourcePath)) {
    fs.copySync(localDemoSourcePath, targetDir)
  }
}

// program
//   .version('0.1.0')
//   .dev('true')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv);

//   console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);


// function range(val) {
//   return val.split('..').map(Number);
// }

// function list(val) {
//   return val.split(',');
// }

// function collect(val, memo) {
//   memo.push(val);
//   return memo;
// }

// function increaseVerbosity(v, total) {
//   return total + 1;
// }

// program
//   .version('0.1.0')
//   .usage('[options] <file ...>')
//   .option('-i, --integer <n>', 'An integer argument', parseInt)
//   .option('-f, --float <n>', 'A float argument', parseFloat)
//   .option('-r, --range <a>..<b>', 'A range', range)
//   .option('-l, --list <items>', 'A list', list)
//   .option('-o, --optional [value]', 'An optional value')
//   .option('-c, --collect [value]', 'A repeatable value', collect, [])
//   .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
//   .parse(process.argv);

// console.log(' int: %j', program.integer);
// console.log(' float: %j', program.float);
// console.log(' optional: %j', program.optional);
// program.range = program.range || [];
// console.log(' range: %j..%j', program.range[0], program.range[1]);
// console.log(' list: %j', program.list);
// console.log(' collect: %j', program.collect);
// console.log(' verbosity: %j', program.verbose);
// console.log(' args: %j', program.args);

// program
//   .version('0.1.0')
//   .option('-s --size <size>', 'Pizza size', /^(large|medium|small)$/i, 'medium')
//   .option('-d --drink [drink]', 'Drink', /^(coke|pepsi|izze)$/i)
//   .parse(process.argv);

// console.log(' size: %j', program.size);
// console.log(' drink: %j', program.drink);





// program
//   .version('0.1.0')
//   // .usage('test')
//   .command('rmdir <dir> [otherDirs...]')
//   .action(function (dir, otherDirs) {
//     console.log('rmdir %s', dir);
//     if (otherDirs) {
//       otherDirs.forEach(function (oDir) {
//         console.log('rmdir %s', oDir);
//       });
//     }
//   });

// program.parse(process.argv);

program
  .version(require('./package.json').version)
  // .usage('[options] <file ...>')
  // .option('-d, --development', 'development mode')
  // .option('-D, --development-clean', 'development mode, remove cache common files')
  // .option('-b, --build', 'build all files with production mode')
  
  
program
  .command('init <dir>')
  .action(function (dir){
    const localPath = process.cwd()
    if (dir) {
      const srcPath = path.join(localPath, dir)
      if (!fs.pathExistsSync(srcPath)) {
        fs.mkdirpSync(srcPath)
        shelljs.exec(`cd ${srcPath} && git clone https://github.com/webkixi/aotoo-hub.git`).stdout
        shelljs.exec(`cd ${srcPath}/aotoo-hub && mv * ../ && yarn install`).stdout
      } else {
        log(chalk.red('项目文件存在！请重新指定新项目目录'))
      }

      // const srcPath = path.join(localPath, dir)

      // // 生成初始化的配置文件
      // const baseConfig = path.join(srcPath, 'aotoo.config.js')
      // fs.outputFileSync(baseConfig, _aotooConfigContent)

      // // 生成package.json
      // const nProjectPackageJson = path.join(srcPath, 'package.json')
      // fs.copySync(projectPackageJson, nProjectPackageJson)

      // // 生成babelrc
      // const nProjectBabelFile = path.join(srcPath, '.babelrc')
      // fs.copySync(projectBabelFile, nProjectBabelFile)
      
      // // 生成gitignore文件
      // const nProjectGitIgnoreFile = path.join(srcPath, '.gitignore')
      // fs.copySync(projectGitIgnoreFile, nProjectGitIgnoreFile)

      // // 生成原始demo文件
      // const demoSourcePath = path.join(__dirname, 'src')
      // const targetSourceCodePath = path.join(srcPath, 'src')
      // fs.mkdirpSync(targetSourceCodePath)
      // if (fs.pathExistsSync(demoSourcePath)) {
      //   fs.copySync(demoSourcePath, targetSourceCodePath)
      // }
      // shelljs.exec(`cd ${srcPath} && yarn install`).stdout



      // const srcPath = path.join(localPath, dir)
      // const baseConfig = path.join(srcPath, 'aotoo.config.js')
      // const projectPath = path.join(srcPath, 'src/project/js')  // ????
      // const projectEmptyPath = path.join(projectPath, 'index.js')

      // const nProjectPackageJson = path.join(srcPath, 'package.json')
      // const nProjectBabelFile = path.join(srcPath, '.babelrc')
      // if (!fs.pathExistsSync(srcPath)) {
      //   fs.mkdirpSync(srcPath)
      //   fs.mkdirpSync(projectPath)
      //   fs.outputFileSync(baseConfig, _aotooConfigContent)

      //   fs.copySync(emptyJsFile, projectEmptyPath)
      //   fs.copySync(projectPackageJson, nProjectPackageJson)
      //   fs.copySync(projectBabelFile, nProjectBabelFile)
      //   shelljs.exec(`cd ${srcPath}`).stdout
      // }
    }
  })

program
  .option('--config <file>', '指定场景配置文件名', 'default')
  .option('--scenes [type]', '指定场景配置文件名', 'default')
  .option('--name <names>', '指定场景配置')
  // .option('--port <n>', 'listening on port', parseInt)
  .option('--server', '是否需要server端', true)

  .command('dev [name]')
  .action(function (name) {
    process.env.NODE_ENV = 'development'
    const localPath = process.cwd()
    var baseConfigFile = path.join(localPath, 'aotoo.config.js')
    if (fs.pathExistsSync(baseConfigFile)) {
      const baseConfig = require(`${baseConfigFile}`)
      const srcPath = baseConfig.src
      const aotooIndex = path.join(__dirname, 'build/cmdIndex.js')

      argv.config = baseConfigFile
      // argv.scenes = program.scenes
      // argv.server = program.server
      // argv.name = argv.name
      // argv.port = argv.port
      // argv.rebuild = argv.rebuild
      require(`${aotooIndex}`)({argv})
      
      // let commandStr = `export NODE_ENV=development && node ${aotooIndex}`
      // if (fs.pathExistsSync(srcPath)) {
      //   if (name) {
      //     `export NODE_ENV=development && node ${aotooIndex} --name ${name}`
      //   }
      //   execa.shell(commandStr).then(result => {
      //     console.log(result.stdout);
      //   })
      // }
    } else {
      log(chalk.red('请在项目根目录运行!'))
    }
  })


program.parse(process.argv);
