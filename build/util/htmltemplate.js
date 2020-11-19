let _tempC = `
  <!doctype html>
  <html class="no-js" lang="en">
    <head>
      <title>~~pagetitle~~</title>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
      ~~commoncss~~
      ~~env~~
    </head>
    <body>
      <div class="container" id="root">~~root~~</div>
    </body>
  </html>
`

module.exports = function(asset, {checkIsProxy}) {
  return _tempC
  // const { SRC, argv } = asset
  // const startFromServer = argv.server || checkIsProxy(asset)
  // if (startFromServer) {
  //   return _tempC.replace('~~root~~', '<%- root %>').replace('~~env~~', '<%- env %>').replace('~~pagetitle~~', '<%= pageTitle %>')
  // } else {
  //   _tempC = _tempC.replace('~~root~~', '').replace('~~pagetitle~~', '<%= title %>');
  //   _tempC = _tempC.replace('~~env~~', '<script>var noserver=true; </script>');
  //   return _tempC
  // }
}