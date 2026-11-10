import helper from '../common/helper.js';
import { getWsToken } from "@/api/user"

class socketClient {
    websocket = null;
    connectURL = '';
    // 开启标识
    socket_open = false;
    // 心跳timer
    hearbeat_timer = null;
    // 心跳发送频率
    hearbeat_interval = 9000;
    // 是否自动重连
    is_reonnect = true;
    // 重连次数
    reconnect_count = 3;
    // 已发起重连次数
    reconnect_current = 1;
    // 网络错误提示此时
    ronnect_number = 0;
    // 重连timer
    reconnect_timer = null;
    // 重连频率
    reconnect_interval = 5000;
    receive_message = null;
    wsUrl = ""

    initSocket(receive_message) {
        this.receive_message = receive_message
        const _this = this
        getWsToken().then(response => {
            if (response.data.code == 1) {
                const res = response.data.data;
                helper.set("socketUrl", res.WebSocket);
                helper.set("socketToken", res.token);
                helper.set("socketUid", res.uid);
                const url = res.WebSocket;
                if (url != "") {
                    _this.initWebSocket(_this.receive_message, url);
                }
            }
        });
    }
    // 初始化socket
    initWebSocket(receive_message, wsUrl,onOpen) {
        this.onOpen = onOpen
        if (!('WebSocket' in window)) {
            return null
        }
        if (!helper.get("socketToken")) {
            return
        }
        this.receive_message = receive_message
        if (wsUrl) {
            this.wsUrl = wsUrl;
        }

        if (!this.wsUrl) {
            return;
        }
        const main_ws = new WebSocket(this.wsUrl)
        main_ws.onmessage = (msg) => {
            const info = helper.parseMsg(msg.data);
            if (info['order'] == 'server') {
                const msg_url = 'wss' + '://' + info['host'] + '/ws' + info['port'];
                helper.set('socketMsgUrl', msg_url);
                this.msg(receive_message, msg_url)
                main_ws.close()
            }
        }

        main_ws.onclose = () => {

        }

        // 连接成功
        main_ws.onopen = ()=> {
            if (main_ws.readyState == 1) {
                main_ws.send('type=askserver');
            }
        }

        // 连接发生错误
        main_ws.onerror = function () {

        }
    }


    msg(receiveMessage, url) {
        const _this = this
        // console.log('进来执行了' + url);
        this.websocket = new WebSocket(url)

        this.websocket.onmessage = (e) => {
            if (receiveMessage) {
                receiveMessage(e)
            }
        }

        // 连接发生错误
        this.websocket.onerror = function (e) {
        }

        this.websocket.onclose = (e) => {
            clearInterval(this.hearbeat_timer)
            _this.socket_open = false
            // 需要重新连接
            if (_this.is_reonnect) {
                _this.reconnect_timer = setTimeout(() => {
                    // 超过重连次数
                    if (_this.reconnect_current > _this.reconnect_count) {
                        clearTimeout(_this.reconnect_timer)
                        _this.is_reonnect = false
                        return
                    }

                    // 记录重连次数
                    _this.reconnect_current++
                    _this.reconnect()
                }, _this.reconnect_interval)
            }
        }

        // 连接成功
        this.websocket.onopen = function (e) {
            _this.socket_open = true
            _this.is_reonnect = true
            _this.reconnect_current = 1;
            // console.log('消息连接成功');
            _this.send({
                type: 'add',
                uid: helper.get("socketUid"),
                token: helper.get("socketToken")
            });
            // 开启心跳
            _this.heartbeat()
            _this.onOpen && _this.onOpen()
        }
    }

    send(data, callback = null) {
        if(!this.websocket) return
        // 开启状态直接发送
        if (this.websocket.readyState === this.websocket.OPEN) {
            this.websocket.send(helper.getQueryParams(data))
            if (callback) {
                callback()
            }

            // 正在开启状态，则等待1s后重新调用
        } else {
            clearInterval(this.hearbeat_timer)
            if (this.ronnect_number < 1) {
                //   ElMessage({
                //     type: 'error',
                //     message: 'chat.unopen',
                //     duration: 6000,
                //   })
            }
            this.ronnect_number++
        }
    }


    heartbeat() {
        if (this.hearbeat_timer) {
            clearInterval(this.hearbeat_timer)
        }
        const _this = this
        this.hearbeat_timer = setInterval(() => {
            const data = {
                type: 'online'
            }
            _this.send(data)
        }, this.hearbeat_interval)
    }

    close() {
        clearInterval(this.hearbeat_interval)
        this.is_reonnect = false
        this.websocket && this.websocket.close && this.websocket.close()
    }

    /**
     * 重新连接
     */
    reconnect() {
        if (this.websocket && !this.is_reonnect) {
            this.close()
        }
        // console.log('重新链接');
        this.initSocket(this.receive_message)
        // const url = helper.get('socketMsgUrl') ?? '';
        // if (url != '') {
        //     console.log('重新链接' + url)
        //     this.msg(this.receive_message, url)
        // }
    }
}

export {
    socketClient
};
