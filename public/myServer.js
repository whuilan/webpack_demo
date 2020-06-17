var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')
var server = http.createServer(function(request, response){
    //获取输入的url解析后的对象
    var pathObj = url.parse(request.url, true);
    //static文件夹的绝对路径
    var staticPath = path.resolve(__dirname)
    //获取资源文件绝对路径
    var filePath = path.join(staticPath, pathObj.pathname)
    if(filePath.indexOf('favicon.ico') === -1){//屏蔽浏览器默认对favicon.ico的请求
        //同步读取file
        // var fileContent = fs.readFileSync(filePath,'binary')
        // response.write(fileContent, 'binary')
         //异步读取file
        fs.readFile(filePath, 'binary', function(err, fileContent){
          if(err){
              console.log('404')
              response.writeHead(404, 'not found')
              response.end('<h1>404 Not Found</h1>')
          }else{
              console.log('ok')
              response.write(fileContent, 'binary')
              response.end()
          }
      })
    }
    response.end()
})
// server.listen(8080)
// console.log('visit http://localhost:8080')