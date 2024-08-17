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

    function checkIsConnect() {
        if (!isConnect) {
            console.log('尚未建立連線')
            return false
        }
        return true
    }

    return { checkIsConnect, connectMqtt, disconnectMqtt }
}

export default useMq
