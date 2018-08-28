async function myControl(ctx, next) {
  ctx.body = 'node端自定义路由导航'
}

// 返回静态mapper的映射表，前端注入静态文件
export default function (fkp) {
  fkp.routepreset('/plugins', {
    customControl: myControl
  })
}