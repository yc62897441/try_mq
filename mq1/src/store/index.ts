import { create, StateCreator } from 'zustand'

type UseMqttStoreType = {
    isConnect: boolean
    setIsConnect: (value: boolean) => void
    topicList: string[]
    setTopicList: (list: string[]) => void
    addTopicToList: (topic: string) => void
    removeTopicFromList: (topic: string) => void
}

// 在 Zustand 中，StateCreator 是用來定義狀態創建邏輯的，應該傳給 create 函數來生成一個 store。
const createMqttStore: StateCreator<UseMqttStoreType> = (set) => ({
    isConnect: false,
    setIsConnect: (value) =>
        set({
            isConnect: value,
        }),
    topicList: [],
    setTopicList: (list) =>
        set(() => ({
            topicList: list,
        })),
    // TODO: 避免加入重複的 topic
    addTopicToList: (topic) =>
        set((state) => ({
            topicList: [...state.topicList, topic],
        })),
    removeTopicFromList: (topic) =>
        set((state) => ({
            topicList: state.topicList.filter((item) => item !== topic),
        })),
})
export const useMqttStore = create<UseMqttStoreType>(createMqttStore)
