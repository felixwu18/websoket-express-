
// 实现两人聊天, websocket服务端实现
var ws = require("nodejs-websocket"); //导入websocket实现模块
var zsConnection = null,
    lsConnection = null; //张三与李四的链接对象
//创建websocket服务器
ws.createServer(function (connection) {

    //监听客户端发来的信息，并作出回应
    connection.on("text", function (str) {
        console.log("text", str, typeof str, str.length, connection.frameBuffer, connection.server.socket._connections)
        // 解析前两个字代表的用户身份
        if (str == "张三") {
            console.info("张三链接成功");
            zsConnection = connection; //获取对应于张三的连接对象
        }
        if (str == "李四") {
            console.info("李四链接成功");
            lsConnection = connection; //获取对应于李四的连接对象
        }

        if (zsConnection != null && lsConnection != null && str.length > 2) { // str.length大于2表示是正式发送的信息
            // if (str.slice(0, 2) == "张三") lsConnection.sendText(str);
            // if (str.slice(0, 2) == "李四") zsConnection.sendText(str);
            // 用 var connectionId = connection.frameBuffer来判断连接客服端
            var connectionId = connection.frameBuffer;
            if(connectionId = "张三")  lsConnection.sendText(str);
            if(connectionId = "李四")  lsConnection.sendText(str);
            console.info(str);
        }

        if ((zsConnection == null || lsConnection == null) && str.length > 2) { // 说明链接还未正式建立就有人开始发信息了
            connection.sendText("服务器：您的朋友正处于离线状态..." + new Date() + "<br/><br/>"); // 发送响应信息到客户端
        }
    });

    // 当websocket链接被客户端关闭时执行的操作
    connection.on("close", function (code, reason) {
        // 哪个客服端关闭了连接
        console.log(connection.frameBuffer+"客户端关闭连接了");
    });

    // 当websocket链接在客户端处出现异常时执行的操作
    connection.on("error", function (code, reason) {
        console.log("客户端链接出来异常");
    });

}).listen(8081, "127.0.0.1"); // 这个websocket链接监听的地址与端口为 127.0.0.1:8081

console.log("WebSocket建立完毕,等待客户端链接中...");






/*
//连接对象connection的部分信息
//与服务端连接对象建立连接时,客服端发送的信息(标识): var connectionId = connection.frameBuffer 
    readyState: 1,
    buffer: <Buffer >,
    frameBuffer: '李四',
    outStream: null,
    key: 'IZe1uNQrZySgVLSyXVu2VQ==',
    headers:
    { host: '127.0.0.1:8081',
        connection: 'Upgrade',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        upgrade: 'websocket',
        origin: 'file://',
        'sec-websocket-version': '13',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'sec-websocket-key': 'IZe1uNQrZySgVLSyXVu2VQ==',
        'sec-websocket-extensions': 'permessage-deflate; client_max_window_bits' },
*/

// 注意;
/*
    1.客户端代码监听的是服务端操作，比如onclose等方法，会在服务端链接关闭时触发。
    2.服务端代码监听的是客户端操作，当客户端调用ws.close()显示的关闭socket链接时，服务端的close事件就会被触发。
    3.在服务端，应该是每个客户端都对应这一个链接对象的
*/



/*
//建立的连接数:
//var connectionCount = connection.server.socket._connections

server:
   Server {
     socket:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 3,
        _maxListeners: undefined,
        _connections: 2,
        _handle: [Object],
        _usingSlaves: false,
        _slaves: [],
        _unref: false,
        allowHalfOpen: false,
        pauseOnConnect: false,
        _connectionKey: '4:127.0.0.1:8081',
        [Symbol(asyncId)]: 8 },
     connections: [ [Object], [Circular] ],
     domain: null,
     _events: { connection: [Function] },
     _eventsCount: 1,
     _maxListeners: undefined,
     _selectProtocol: null },
     
     */