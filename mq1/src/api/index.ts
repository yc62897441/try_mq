// export const apiPath = 'https://6806.shinfox.com.tw/ShinfoxWebsiteWebAPI/api/news/tw/0/10'
export const apiPath = 'http://localhost:3000/topic'

export async function fetcher(path: string) {
    try {
        const response = await fetch(path)
        console.log('response', response)

        if (response?.status === 401) {
            console.log('沒有權限')
            return
        }
        if (response?.status === 404) {
            console.log('找不到對應資源')
            return
        }
        if (response?.status === 500) {
            console.log('伺服器錯誤')
            return
        }
        if (response?.status === 200) {
            // .json() 是一個用於處理 fetch API 回應的 JavaScript 方法。當你使用 fetch 從伺服器獲取資料時，回應會以 Response 物件的形式返回。這個 Response 物件包含了多種方法，可以用來處理伺服器回應的數據。.json() 就是其中一個最常用的方法，將 Response 物件中的原始數據解析為 JSON 格式，並將其轉換為 JavaScript 的對象或陣列。
            const data = await response.json()
            console.log('data', data)
            return data
        }
    } catch (error) {
        console.error(error)
    }
}
