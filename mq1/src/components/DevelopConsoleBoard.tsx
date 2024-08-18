import React from 'react'

import style from './developConsoleBoard.module.scss'

import { sendMessage, subscribeMq, unsubscribeMq } from '../mq/init'

import useMq from '../mq/useMq'

import { apiPath, fetcher } from '../api'

import { useMqttStore } from '../store'

function DevelopConsoleBoard() {
    const { topicList, addTopicToList, removeTopicFromList } = useMqttStore((state) => state)
    const { checkIsConnect, connectMqtt, disconnectMqtt } = useMq()

    // TODO: 之後 topic 改為函數傳入的參數
    function handleSendMessage() {
        if (!checkIsConnect()) return

        const topic = topicList[0]
        if (!topic) {
            console.log('目前未訂閱主題')
            return
        }

        sendMessage(topic, '小明說hello')
    }

    async function handleSubscribeMq() {
        if (!checkIsConnect()) return

        try {
            const data = await fetcher(apiPath)
            const topic = data.topic
            console.log('handleSubscribeMq')
            subscribeMq(topic)
            addTopicToList(topic)
        } catch (error) {
            console.error(error)
        }
    }

    // TODO: 之後 topic 改為函數傳入的參數
    function handleUnsubscribeMq() {
        if (!checkIsConnect()) return

        const topic = topicList[0]
        if (!topic) {
            console.log('目前未訂閱主題')
            return
        }
        console.log('handleUnsubscribeMq')
        unsubscribeMq(topic)
        removeTopicFromList(topic)
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
