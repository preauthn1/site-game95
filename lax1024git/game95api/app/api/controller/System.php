<?php
namespace app\api\controller;
use app\api\redis\ApiRedis;
use app\common\lib\Respons;
use app\api\factory\SystemFactory;
use app\common\model\AdsChannelModel;
use app\common\service\MessageService;
use think\Exception;
use think\Request;
class System
{	
	
    //未读
    public function info(Request $request){
        $rsps=(new SystemFactory())->info_run();
        return Respons::run($rsps);
    }

    //未读
    public function info_new(){
        $rsps=(new SystemFactory())->get_new_info();
        return Respons::run($rsps);
    }
    
    //未读
    public function param(Request $request){
        $rsps=(new SystemFactory())->param_run();
        return Respons::run($rsps);
    }
    
    public function ranking(){
        $rsps=(new SystemFactory())->ranking_run();
        return Respons::run($rsps);
    }
    
    public function rule(){
        $rsps=(new SystemFactory())->rule_run();
        return Respons::run($rsps);
    }
    
    public function doanload(){
        $rsps=(new SystemFactory())->doanload_run();
        return Respons::run($rsps);
    }
    
    public function banner(Request $request){
        $rsps=(new SystemFactory())->banner_run();
        return Respons::run($rsps);
    }
    
    public function send_code(Request $request){
        $rsps=(new SystemFactory())->send_code_run();
        return Respons::run($rsps);
    }
    
    public function send_mail_code(Request $request){
        $rsps=(new SystemFactory())->send_email_code_run();
        return Respons::run($rsps);
    }
    
    public function get_upd(Request $request){
        $rsps=(new SystemFactory())->get_upd_run();
        return Respons::run($rsps);
    }

    //获取镜像站点
    public function get_mirror_site(){
        $result = (new SystemFactory())->get_mirror_site();
        return Respons::run($result);
    }

    public function getChannel(Request $request) {
        $acid = $request->param('acid/d');
        $channel = AdsChannelModel::where('ac_id', $acid)->where('ac_state', 1)->find();
        if (!empty($channel)) {
            return Respons::run(1, [
                'code' => $channel['ac_code'],
                'type' => $channel['ac_adtype'],
                'share_code' => $channel['ac_share_code'],
            ]);
        }
        return Respons::run();
    }

    public function appDownload(){
        $userDevice = $_SERVER['HTTP_USER_AGENT'];
        $apiRedis = new ApiRedis();
        $sys = $apiRedis->systemInfo();
        $downloadUrl = $sys['android_download_url'];
        if( strpos($userDevice, 'iPhone') !== false || strpos($userDevice, 'iPad') !== false ){
            $downloadUrl = $sys['ios_download_url'];
        }
//        if (strpos($userDevice, 'Android') !== false) {
//            // 用户使用的是安卓设备
//            echo "用户使用的是安卓设备";
//        } elseif (strpos($userDevice, 'iPhone') !== false || strpos($userDevice, 'iPad') !== false) {
//            // 用户使用的是 iPhone 或 iPad
//            echo "用户使用的是 iPhone 或 iPad";
//        }
        header("Location: {$downloadUrl}");exit;
    }

    //redis消息写入
    public function redisMessage(){
        $params = request()->param();
        try {
            $sign = $params['sign'];
            unset($params['sign'],$params['s']);
            //验证签名
            ksort($params);
            $_sign = strtoupper(md5(json_encode($params).env('redis_message.sign_key').$params['random_str']));
            if( $_sign != $sign ){
                throw new Exception('签名错误');
            }
            //发送redis请求
            MessageService::publicSendMsg($params['msg'], $params['uid'], $params['mode'], $params['showtime'], $params['title'], $params['resend']);
            return Respons::run(1, $params, 'success');
        }catch (\Exception $e){
            return Respons::run(1, $params, $e->getMessage());
        }
    }
}