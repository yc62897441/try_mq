import React, { useState } from 'react'

import style from './app.module.scss'

import '../style/cssreset.css'
import '../style/global.css'

import { chatStore } from './store/chat'

import ChatRoom from './components/chatRoom/ChatRoom'
import DevelopConsoleBoard from './components/DevelopConsoleBoard'

const tempChatList = [
    {
        content: 'aaa aaaaaa aaaaaa aaaaaaaaaaaa aaa aaaaaaaaa aaaaaa aaa aaa aaaaaa',
        sender: 'a',
    },
    {
        content: 'bbb bbb bbbbbb bbb bbbbbbbbbbbb bbb bbbbbb bbb bbbbbbbbb bbb',
        sender: 'boy bob',
    },
    {
        content: 'aaa2',
        sender: 'a',
    },
]

function App() {
    const { setChatMsgList } = chatStore((state) => state)

    const [isOpen, setIsOpen] = useState<true | false>(false)

    function enterChatRoom() {
        setIsOpen(true)

        // TODO: 暫時用假資料帶入
        setChatMsgList(tempChatList)
    }

    return (
        <main className={style.app}>
            <ChatRoom isOpen={isOpen} setIsOpen={setIsOpen} />
            {!isOpen && <button onClick={enterChatRoom}>加入聊天室</button>}

            <br />
            <br />

            <DevelopConsoleBoard />
        </main>
    )
}

export default App
