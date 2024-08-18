import { create, StateCreator } from 'zustand'

type MessageType = {
    content: string
    sender: string
}

type ChatType = {
    chatMsgList: MessageType[]
    setChatMsgList: (list: MessageType[]) => void
    addChat: (msg: MessageType) => void
}

export const createChatStore: StateCreator<ChatType> = (set) => ({
    chatMsgList: [],
    setChatMsgList: (list) =>
        set({
            chatMsgList: list,
        }),
    addChat: (msg) =>
        set((state) => ({
            chatMsgList: [...state.chatMsgList, msg],
        })),
})

export const chatStore = create(createChatStore)
