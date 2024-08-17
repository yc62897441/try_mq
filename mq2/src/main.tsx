import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const domContainer = document.querySelector('#root')

if (domContainer) {
    const root = ReactDOM.createRoot(domContainer)
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
} else {
    console.error('Failed to find the root element')
}
