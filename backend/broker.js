//  啟動 node broker.js
const aedes = require('aedes')()
const { createServer } = require('net')
const http = require('http')
const ws = require('websocket-stream')
const port = 1883
const wsPort = 8883

// ======================================
// 建立 TCP 伺服器來處理 MQTT 通訊
const server = createServer(aedes.handle)

server.listen(port, function () {
    console.log(`MQTT broker is running on TCP port ${port}`)
})

// 建立 HTTP 伺服器來處理 WebSocket 通訊
const httpServer = http.createServer()
ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(wsPort, function () {
    console.log(`MQTT broker is running on WebSocket port ${wsPort}`)
})

// ======================================
// 增加事件監聽器
// 當有客戶端連接時觸發
aedes.on('client', (client) => {
    console.log(`客戶端連接 Client Connected: ${client ? client.id : client} to broker ${aedes.id}`)
})

// 當有客戶端斷開連接時觸發
aedes.on('clientDisconnect', (client) => {
    console.log(`客戶端斷開連接 Client Disconnected: ${client ? client.id : client} from broker ${aedes.id}`)
})

// 當有訊息發布時觸發
aedes.on('publish', (packet, client) => {
    console.log(`訊息發布 Client ${(client && client.id) || 'BROKER'} has published ${packet.payload.toString()} on ${packet.topic}`)
})

// 當有客戶端訂閱主題時觸發
aedes.on('subscribe', (subscriptions, client) => {
    console.log(`客戶端訂閱主題 Client ${client.id} subscribed to topics: ${subscriptions.map((s) => s.topic).join(', ')}`)
})

// 當有客戶端取消訂閱主題時觸發
aedes.on('unsubscribe', (subscriptions, client) => {
    console.log(`客戶端取消訂閱 Client ${client.id} unsubscribed from topics: ${subscriptions.join(', ')}`)
})

// TODO: 轉發 topic 給另一個客戶端
