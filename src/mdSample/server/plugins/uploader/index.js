const fs = require('fs')
const path = require('path')
const multer = require('@koa/multer');
const uploaderRoot = CONFIG.server.uploads
if (!fs.existsSync(uploaderRoot)) {
  fs.mkdirSync(uploaderRoot)
}

//上传文件存放路径、及文件命名
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploaderRoot)
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})

//文件上传限制
// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
let defaultLimits = {
  fields: 10, //非文件字段的数量
  fileSize: 500 * 1024, //文件大小 单位 b
}

// const upload = multer({ storage, limits });

function getUpload(lmt={}){
  let limits = Object.assign({}, defaultLimits, lmt)
  return multer({storage, limits})
}

// file => <input name='file'
// file => let formdata = new Formdata();  formdata.set('name', file)
// 上传单传
async function save2localSingle(ctx, next){
  const upload = getUpload({files: 1})
  await upload.single('file')(ctx, next).then(async ()=>{
    ctx => {
      console.log('ctx.request.file', ctx.request.file);
      console.log('ctx.file', ctx.file);
      console.log('ctx.request.body', ctx.request.body);
      ctx.body = 'done';
    }
  })
}

// 上传多图
async function save2localAry(ctx, next){
  await upload.array('file')(ctx, next).then(()=>{
    console.log('ctx.request.files', ctx.request.files);
    console.log('ctx.files', ctx.files);
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = 'done';
  })
}

// 多字段，应该可以配水印等参数
async function save2localMulti(ctx, next){
  await upload.fields([{
      name: 'file1',
      maxCount: 1
    },
    {
      name: 'file2',
      maxCount: 2
    }
  ])(ctx, next).then(()=>{
    console.log('ctx.request.files', ctx.request.files);
    console.log('ctx.files', ctx.files);
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = 'done';
  })
}

let ossurl = 'api/to/save/file'
async function directUploader(ctx, next) {
  if (Fetcher && Fetcher.got) {
    ctx.body = await ctx.req.pipe(Fetcher.got.stream(ossurl))
  } else {
    ctx.body = {
      message: '没有指定全局Fetcher，不能上传'
    }
  }
}

// 拉取远程图片并保存在本地
// fetchPic('http://www.google.com/abc.jpg', 'dir/prefix-abc.jpg')
async function fetchPic(file, filename){
  let localpath = null

  if (!fs.existsSync(uploaderRoot)) {
    fs.mkdirSync(uploaderRoot)
  }

  if (filename) {
    localpath = path.join(uploaderRoot, filename)
  }

  if (file && filename) {
    await pipeline(
      Fetcher.got.stream(file),
      fs.createWriteStream(localpath)
    );
  }
}


export default function(aks){
  // 自定义路由  
  aks.routepreset('/uploader-single', {
    customControl: save2localSingle
  })

  aks.routepreset('/uploader-ary', {
    customControl: save2localAry
  })

  aks.routepreset('/uploader-multi', {
    customControl: save2localMulti
  })

  aks.routepreset('/uploader-direct', {
    customControl: directUploader
  })

  // 自定义uploader插件
  // 可以在其他插件的customControl方法中通过 aks.uploader() 返回 fetchPic 来存储远程图片
  return function(ctx){
    return fetchPic
  }
}
