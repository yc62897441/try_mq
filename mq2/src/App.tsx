import React from 'react'

import style from './app.module.scss'

import '../style/cssreset.css'
import '../style/global.css'

import useMq from './mq/useMq'

import { sendMessage, topic, subscribeMq, unsubscribeMq, disconnectMq } from './mq/init'

function App() {
    useMq()

    function handleSendMessage() {
        sendMessage(topic, '大王說hello')
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
        <main className={style.app}>
            大王 App
            <div>
                <button onClick={handleSendMessage}>sendMessage</button>
            </div>
            <div>
                <button onClick={handleSubscribeMq}>subscribeMq</button>
            </div>
            <div>
                <button onClick={handleUnsubscribeMq}>unsubscribeMq</button>
            </div>
            <div>
                <button onClick={disconnectMq}>disconnectMq</button>
            </div>
        </main>
    )
}

export default App
