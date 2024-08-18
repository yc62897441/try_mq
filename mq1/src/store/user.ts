import { create, StateCreator } from 'zustand'

const tempUser = {
    name: 'a',
}

type UserType = {
    name: string
}

// 暫時使用假資料
const createUserStore: StateCreator<UserType> = (set) => ({
    name: tempUser.name,
})

export const userStore = create(createUserStore)
