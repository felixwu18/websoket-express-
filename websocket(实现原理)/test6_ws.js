
/*
在http服务器中回调函数的参数为 请求与响应对象,而
在在websocket中，回调函数参数为与客户端的 链接对象(connection)。

*/


// websocket服务器
var ws = require("nodejs-websocket"); // 导入websocket实现模块

// 创建websocket服务器
ws.createServer(function (connection) {
    // console.log(connection)

    // 监听客户端发来的信息，并作出回应
    connection.on("text", function (str) {
        console.log("收到客户端的信息为:" + str); // str为客户端发来的信息
        connection.sendText("你好客户端，我收到你发来的信息了，你的信息为：" + str); // 发送响应信息到客户端
    });

    // 当websocket链接被客户端关闭时执行的操作
    connection.on("close", function (code, reason) {
        console.log("客户端关闭连接了");
    });

    // 当websocket链接在客户端处出现异常时执行的操作
    connection.on("error", function (code, reason) {
        console.log("客户端链接出来异常");
    });

}).listen(8081, "127.0.0.1"); // 这个websocket链接监听的地址与端口为 127.0.0.1:8081

console.log("WebSocket建立完毕,等待客户端链接中...");