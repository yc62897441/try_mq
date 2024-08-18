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
        set(() =>
            // 當箭頭函數的主體僅返回一個物件時，可以直接用小括號 () 包裹物件，而不需要使用 return 關鍵字。這樣寫法更簡潔且易讀，特別適合返回單一物件的情況。
            ({
                topicList: list,
            })
        ),
    // setTopicList: (list) =>
    //     set(() =>
    //         // 這種寫法則是完整地寫出了函數體，其中包括 return 關鍵字和大括號 {}。雖然這樣寫和第一種寫法的功能是一樣的，但顯得有些冗長。這種寫法通常適合在函數體內有多行邏輯操作時使用。
    //         {
    //             return {
    //                 topicList: list,
    //             }
    //         }
    //     ),
    addTopicToList: (topic) =>
        // 這種寫法將 addTopicToList 定義為一個箭頭函數，並且直接將 set 函數的返回值作為 addTopicToList 的返回值。
        set((state) => {
            if (state.topicList.includes(topic)) return { topicList: state.topicList }
            return {
                topicList: [...state.topicList, topic],
            }
        }),
    // addTopicToList: (topic) => {
    //     // 這種寫法也將 addTopicToList 定義為一個箭頭函數，但這裡箭頭函數的函數體使用了大括號 {} 包裹，因此需要明確地調用 set 函數，並且沒有返回值，意味著這個函數的返回值是 undefined。
    //     set((state) => {
    //         if (state.topicList.includes(topic)) return { topicList: state.topicList }
    //         return {
    //             topicList: [...state.topicList, topic],
    //         }
    //     })
    // },
    removeTopicFromList: (topic) =>
        set((state) => ({
            topicList: state.topicList.filter((item) => item !== topic),
        })),
})
export const useMqttStore = create<UseMqttStoreType>(createMqttStore)
