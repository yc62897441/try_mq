//  啟動 node broker.js
const aedes = require('aedes')()
const { createServer } = require('net')
const http = require('http')
const ws = require('websocket-stream')
const port = 1883
const wsPort = 8883

const express = require('express') // 新增這行
const cors = require('cors')
const httpPort = 3000 // HTTP 伺服器的端口

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

// TODO: 記錄 clientId 並且記錄其 topic
// TODO: 轉發 topic 給另一個客戶端
// ======================================
// 使用 Express 建立 HTTP 伺服器來處理其他 HTTP 請求
const app = express()

const corsOptions = {
    // origin: 'https://example.com', // 允許的網域
    // origin: ['https://example.com'], // 允許多個來源
    origin: true, // 為 true，這樣會允許所有來源
    methods: 'GET,POST', // 允許的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允許的自訂標頭
}
app.use(cors(corsOptions)) // 設定 CORS

// http://localhost:3000/topic
const topic = 'test/topic'
app.get('/topic', (req, res) => {
    const data = {
        topic: topic,
        message: 'Hello, this is your topic!',
    }
    res.json(data)
})
// app.get('/topic', (req, res) => {
//     const data = {
//         message: 'Hello, this is your data!',
//         // clientsConnected: aedes.connectedClients, //  這個屬性用來獲取當前連接到這個 MQTT broker 的客戶端數量。
//         // brokerId: aedes.id, // 這個屬性是用來獲取這個 MQTT broker 的唯一標識符（ID）。當你運行多個 broker 時，這個 ID 可以幫助你區分不同的代理實例，特別是在分佈式系統中監控和管理不同代理的運行狀況時非常有用。
//     }
//     res.json(data)
// })

app.listen(httpPort, () => {
    console.log(`HTTP server is running on port ${httpPort}`)
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
