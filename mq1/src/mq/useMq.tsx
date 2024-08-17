import { initMqtt, disconnect } from './init'
import { useMqttStore } from '../store'

function useMq() {
    const isConnect = useMqttStore((state) => state.isConnect)
    const setIsConnect = useMqttStore((state) => state.setIsConnect)

    function connectMqtt() {
        if (isConnect) return
        initMqtt()
        setIsConnect(true)
    }

    function disconnectMqtt() {
        if (!isConnect) return
        disconnect()
        setIsConnect(false)
    }

    return { connectMqtt, disconnectMqtt }
}

export default useMq
