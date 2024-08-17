import React from 'react'

import style from './app.module.scss'

import '../style/cssreset.css'
import '../style/global.css'

import DevelopConsoleBoard from './components/DevelopConsoleBoard'

function App() {
    return (
        <main className={style.app}>
            <DevelopConsoleBoard />
        </main>
    )
}

export default App
