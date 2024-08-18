import React, { useState } from 'react'

import style from './chatRoom.module.scss'

import { chatStore } from '../../store/chat'
import { userStore } from '../../store/user'

type ChatRoomPropsType = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

function ChatRoom({ isOpen, setIsOpen }: ChatRoomPropsType) {
    const user = userStore((state) => state)
    const { chatMsgList, addChat } = chatStore((state) => state)

    const [message, setMessage] = useState('')

    function closeChatRoom() {
        setIsOpen(false)
    }

    function handleChange(value: string) {
        setMessage(value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') handleSubmit()
    }

    // TODO: 連接 mqtt
    function handleSubmit() {
        if (message === '') return
        const newChatMsg = {
            content: message,
            sender: user.name,
        }
        addChat(newChatMsg)
        setMessage('')
    }

    return (
        <section className={`${style.section} ${isOpen ? style.isOpen : ''}`}>
            <div className={style.chatRoomTitle}>ChatRoom</div>
            <div className={style.chatList}>
                {chatMsgList?.length > 0 &&
                    chatMsgList.map((item) => (
                        <div className={`${style.chat} ${item.sender === user.name ? style.isReverse : ''} `}>
                            <div className={style.sender}>{item.sender}</div>
                            <div className={style.content}>{item.content}</div>
                        </div>
                    ))}
            </div>

            <div className={style.chatRoomFooter}>
                <input onChange={(e) => handleChange(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} value={message}></input>
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <button onClick={closeChatRoom}>關閉聊天室</button>
        </section>
    )
}

export default ChatRoom
