// 解決「找不到模組 './app.module.scss' 或其對應的型別宣告。ts(2307)」的問題

declare module '*.scss' {
    const content: { [className: string]: string }
    export default content
}
