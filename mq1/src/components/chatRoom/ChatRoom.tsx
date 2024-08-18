import React from 'react'

import style from './chatRoom.module.scss'

import { chatStore } from '../../store/chat'
import { userStore } from '../../store/user'

type ChatRoomPropsType = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

function ChatRoom({ isOpen, setIsOpen }: ChatRoomPropsType) {
    const user = userStore((state) => state)
    const { chatMsgList } = chatStore((state) => state)

    function closeChatRoom() {
        setIsOpen(false)
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
            <button onClick={closeChatRoom}>關閉聊天室</button>
        </section>
    )
}

export default ChatRoom
