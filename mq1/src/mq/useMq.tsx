import { useEffect, useRef } from 'react'

import { initMqtt } from './init'

function useMq() {
    const isInit = useRef(false)

    useEffect(() => {
        if (isInit.current) return
        initMqtt()
        isInit.current = true
    }, [])

    return
}

export default useMq
