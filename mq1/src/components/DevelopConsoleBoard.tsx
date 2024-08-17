import React from 'react'

import style from './developConsoleBoard.module.scss'

import { sendMessage, topic, subscribeMq, unsubscribeMq } from '../mq/init'

import useMq from '../mq/useMq'

// TODO: 向後端取得 topic 列表
// TODO: 訂閱 topic 才可以對該 topic 發送訊息，如果沒有訂閱則不能發送訊息

function DevelopConsoleBoard() {
    const { connectMqtt, disconnectMqtt } = useMq()

    function handleSendMessage() {
        sendMessage(topic, '小明說hello')
    }

    function handleSubscribeMq() {
        console.log('handleSubscribeMq')
        subscribeMq(topic)
    }

    function handleUnsubscribeMq() {
        console.log('handleUnsubscribeMq')
        unsubscribeMq(topic)
    }

    return (
        <section className={style.section}>
            小明 App
            <div>
                <button onClick={handleSendMessage}>發送訊息</button>
            </div>
            <div>
                <button onClick={handleSubscribeMq}>訂閱</button>
            </div>
            <div>
                <button onClick={handleUnsubscribeMq}>取消訂閱</button>
            </div>
            <div>
                <button onClick={connectMqtt}>連線</button>
            </div>
            <div>
                <button onClick={disconnectMqtt}>斷線</button>
            </div>
        </section>
    )
}

export default DevelopConsoleBoard
