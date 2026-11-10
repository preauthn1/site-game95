<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
namespace app\worker;

use GatewayWorker\Lib\Gateway;
use think\facade\Cache;
use Workerman\Worker;
use think\worker\Application;

//    Gateway::sendToAll($data);      // 向全部客户端发送数据
//    Gateway::sendToClient($client_id, $data);  // 向某个客户端发送数据
//    Gateway::closeClient($client_id);      // 关闭某个客户端
//    Gateway::isOnline($client_id);  // 判断某客户端链接是否在线
//    Gateway::bindUid($client_id, $uid);    // 绑定 uid 与 client_id
//    Gateway::unbindUid($client_id, $uid);  // 取消 uid 与 某个 client_id 的绑定
//    Gateway::isUidOnline($uid);      // 某个 uid 是否在线
//    Gateway::GetClientIdByUid();     // 获取与 uid 绑定的 client_id 列表(一对多)
//    Gateway::sendToUid($uid, $data); // 向全部 uid 发送
//    Gateway::joinGroup($client_id, $group);  // 把该 client_id 加入群组
//    Gateway::leaveGroup($client_id, $group); // 将 client_id 离开群组
//    Gateway::sendToGroup($group, $data);     // 向某群组 group 发送
//    Gateway::getClientCountByGroup($group);  // 获取某个组的在线链接数
//    Gateway::getClientSessionsByGroup($group); // 获取某个组的链接信息
//    Gateway::getClientInfoByGroup($group);   // getClientSessionsByGroup 的别名
//    Gateway::getAllClientCount();     // 获取全部的在线链接数
//    Gateway::getAllClientSessions();  // 获取全部在线用户的 session
//    Gateway::getAllClientInfo();      // getAllClientSessions 的别名
//    Gateway::setSession($client_id, $session);      // 设置 session，原 session 值会被覆盖
//    Gateway::updateSession($client_id, $session);   // 更新 session，其实是与旧的session合并
//    Gateway::getSession($client_id);  // 获取某个 client_id的 session

/**
 * Worker 命令行服务类
 */
class Events
{
    /**
     * onWorkerStart 事件回调
     * 当businessWorker进程启动时触发。每个进程生命周期内都只会触发一次
     *
     * @access public
     * @param \Workerman\Worker $businessWorker
     * @return void
     */
    public static function onWorkerStart(Worker $businessWorker)
    {
        $app = new Application;
        $app->initialize();
    }

    /**
     * onConnect 事件回调
     * 当客户端连接上gateway进程时(TCP三次握手完毕时)触发
     *
     * @access public
     * @param int $client_id
     * @return void
     */
    public static function onConnect($client_id)
    {
        $json = [
            'form' => 'init',
            'client_id' => $client_id
        ];
        Gateway::sendToCurrentClient(json_encode($json));
    }

    /**
     * onWebSocketConnect 事件回调
     * 当客户端连接上gateway完成websocket握手时触发
     *
     * @param integer $client_id 断开连接的客户端client_id
     * @param mixed $data
     * @return void
     */
    public static function onWebSocketConnect($client_id, $data)
    {
//        print_r($data);
    }

    /**
     * onMessage 事件回调
     * 当客户端发来数据(Gateway进程收到数据)后触发
     *
     * @access public
     * @param int $client_id
     * @param mixed $data
     * @return void
     */
    public static function onMessage($client_id, $data)
    {
//        Gateway::sendToAll($data);
//        $data = json_decode($data, true);
//        if ($data['form'] == 'ping') {
//            $ping_data = [
//                'form' => 'ping',
//                'time' => time()
//            ];
//            Gateway::sendToCurrentClient(json_encode($ping_data));
//        }
    }

    /**
     * onClose 事件回调 当用户断开连接时触发的方法
     *
     * @param integer $client_id 断开连接的客户端client_id
     * @return void
     */
    public static function onClose($client_id)
    {
//        GateWay::sendToAll("client[$client_id] logout\n");
        $uid = Cache::get(md5($client_id));
        Cache::delete(md5($client_id));
        Cache::delete($uid);
    }

    /**
     * onWorkerStop 事件回调
     * 当businessWorker进程退出时触发。每个进程生命周期内都只会触发一次。
     *
     * @param \Workerman\Worker $businessWorker
     * @return void
     */
    public static function onWorkerStop(Worker $businessWorker)
    {
        echo "WorkerStop\n";
    }
}