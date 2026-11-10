<?php
namespace app\common\lib;
use app\common\model\LangModel;
use app\common\model\LangItemsModel;
use app\common\model\LangItemDetailModel;
use app\common\Utils;
use think\Exception;

class EmailCode
{
    /**
     *邮箱验证码发送
     */
    public static function run($email, $code, $type=0){
        $lang_id = LangModel::where('is_default', 1)->value('id');
        $item_id = 0;
        $sms_content = lang('sms_content');
        if($type == 1){
            $sms_content = lang('sms_content1');
            $item_id = LangItemsModel::where("title",'sms_content1')->value('id');
        } elseif($type == 2) {
            $sms_content = lang('sms_content2');
            $item_id = LangItemsModel::where("title",'sms_content2')->value('id');
        }

        if(empty($item_id)){
            $item_id = LangItemsModel::where("title",'sms_content')->value('id');
        }
        if (strexists($sms_content, 'sms_content')) {
            $sms_content = LangItemDetailModel::where(['lang_id' => $lang_id, 'item_id' => $item_id])->value('text');
        }
        if (strexists($sms_content, 'sms_content')) {
            $sms_content = "Your verification code is:";
        }

        $url = env('email.url', '');
        $data['apikey'] = env('email.apikey', '');
        $data['email'] = $email;
        $code=(string) $code;
        $data['content']= $sms_content.$code;
        $result=Util::postFromRequest($url,$data);
        if (isset($result['code'])&&$result['code']==1){
            return true;
        }else{
            Utils::L('email-error', [$result]);
            return false;
        }
    }
}