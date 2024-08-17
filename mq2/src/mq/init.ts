import type { MqttClient } from 'mqtt'
import mqtt from 'mqtt'

let client: MqttClient | null = null
let init = false

export const topic = 'test/topic'

export async function subscribeMq(topic: string) {
    try {
        return await new Promise((resolve, reject) => {
            client?.subscribe(topic, {}, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            })
        })
    } catch (error) {
        console.error(error)
    }
}

export async function unsubscribeMq(topic: string) {
    try {
        return await new Promise((resolve, reject) => {
            client?.unsubscribe(topic, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            })
        })
    } catch (error) {
        console.error(error)
    }
}

export async function sendMessage(topic: string, message: string) {
    if (client?.publish) client.publish(topic, message)
}

export function initMqtt(clientId?: string) {
    if (init) return
    init = true

    // const connectUrl = 'mqtt://localhost:1883'
    const connectUrl = 'ws://localhost:8883'

    // const connectOptions = {
    //     // qos: 1, // 指定訊息傳送的可靠性級別
    //     // clean: false, // 是否在連接時清除之前的會話資訊
    //     // clientId: clientId || '', // MQTT 客戶端的唯一標識符
    // }
    client = mqtt.connect(
        connectUrl
        // ,connectOptions
    )

    client.on('connect', () => {
        console.log(`connect Mqtt`)
        // const subscribeResponse = subscribeMq(topic)
        // return subscribeResponse
    })

    client.on('message', function (topic, message) {
        console.log(`Received message: ${message.toString()} on topic: ${topic}`)
    })
}

export function disconnectMq() {
    if (client) {
        client.end(
            true, // 定是否在中斷連線前發送 DISCONNECT 訊息給 broker
            disconnectCallback // 函式會在連線成功中斷後執行
        )

        function disconnectCallback() {
            console.log('Mqtt has been disconnected.')
        }
    }
}
