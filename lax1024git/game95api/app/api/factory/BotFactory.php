<?php
namespace app\api\factory;
use app\common\lib\Util;
use app\common\service\BetService;
use app\common\Utils;
use Longman\TelegramBot\Entities\CallbackQuery;
use Longman\TelegramBot\Entities\Message;
use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Telegram;
use Longman\TelegramBot\Request;
use think\facade\Lang;
use think\facade\Db;
use app\common\model\NationModel;
use app\common\model\CurrencyModel;

class BotFactory
{
    private $api_key = '';
    private $username = "";
    private $param;//请求参数

    public function __construct(){
        $this->param=\think\facade\Request::param();
        $this->api_key = env('bot.api_key','');
        $this->username = env('bot.username','');
    }

    public function set_run(){
        try {
            $url = getWebUrl() . "/bot/webhook";
            $api = new Telegram($this->api_key, $this->username);
            $result = $api->setWebhook($url);
            $res['code'] = $result->isOk() ? 0 : 1;
            $res['msg'] = $result->isOk() ? 'success' : 'fail';
            return $res;
        } catch (TelegramException $e) {
            return $e->getMessage();
        }
    }

    public function del_run(){
        try {
            $api = new Telegram($this->api_key, $this->username);
            $result = $api->deleteWebhook();
            $res['code'] = $result->isOk() ? 0 : 1;
            $res['msg'] = $result->isOk() ? 'success' : 'fail';
            return $res;
        } catch (TelegramException $e) {
            return $e->getMessage();
        }
    }

    public function hook_run() {
        $api_key = $this->api_key;
        $username = $this->username;
        try {
            $api = new Telegram($api_key, $username);
            $param = $this->param;
            if(env('bot.log_status',0)){
                Utils::L('bot', $param);
            }
            $paths = [
                root_path('app/common/telegram'),
            ];
            $api->addCommandsPaths($paths);
            $api->handle();
        } catch (Exception $exc) {
            Utils::L('bot_error', [$exc->getMessage(), $exc->getTraceAsString()]);
        }
    }

    public function AutonMessage() {
        $api_key = $this->api_key;
        $username = $this->username;
        try {
            new Telegram($api_key, $username);
            $this->bets();
        } catch (Exception $exc) {
            Utils::L('bot_error', [$exc->getMessage(), $exc->getTraceAsString()]);
        }
    }


    public function bets(){
        $count = env('bot.number',1);
        $min_price = env('bot.min_price',1);
        $max_price = env('bot.max_price',10);
        $chat_id = env('bot.chat_id','');
        $range = env('bot.lang','cn');
        $content = '';
        $startTime = strtotime("-30 minute");//前30分钟
        $endTime = time();
        $where = [
            ['a.gb_winlose','=',3],
            ['t.tc_status','=',1],
//            ['a.gb_bettime', 'between', [$startTime, $endTime]]
        ];
        $betWhere = BetService::getGbidByTime($startTime, $endTime, 'gb_bettime', 'a')['sql'];
        $list = Db::name('game_bets')->alias("a")->where($where)->where($betWhere)
            ->join("dq_user u","a.gb_uid=u.id")
            ->join("dq_game_infos g","a.gb_gid=g.gi_gid")
            ->join("dq_games ge","ge.g_id=a.gb_gid")
            ->join("dq_third_configs t","ge.g_web_tcid=t.tc_id")
            ->field('u.username,g.gi_name,a.gb_winprice,t.tc_name')
            ->order('a.gb_id desc')
            ->limit($count)
            ->select();
        $list_count = count($list->toArray());
        $currency = Util::getCurrencyDefaultSymbol('symbol');

        $num = $count - $list_count;
        for($i=1; $i<=$num; $i++) {
            $name = get_rand_char(10);
            $len = mb_strlen($name);
            $str1 = mb_substr($name,0,1);
            $str2 = mb_substr($name,$len-2,1);
            $game =  Db::name('game_infos')->alias("a")->where([['t.tc_status','=',1]])
                ->join("dq_games g","a.gi_gid=g.g_id")
                ->join("dq_third_configs t","g.g_web_tcid=t.tc_id")
                ->field('a.gi_name,t.tc_name')
                ->orderRaw("rand()")
                ->limit(1)
                ->find();
            $username = $str1.'****'.$str2;
            $amount = rand_float($min_price,$max_price);
            $msg_data = ['third'=>$game['tc_name'],'game'=>$game['gi_name'],'username'=>$username,'amount'=>$amount,'currency'=>$currency];
            $text = "🎉恭喜玩家{:username}，在<b>{:third}</b>平台，<b>{:game}</b>游戏，喜中<b><u>{:amount}</u>{:currency}</b>🎉";
            $content .= lang($text, $msg_data,strtolower($range))."\n";
        }

        if($list_count >= 1){
            foreach ($list as $v){
                $len = mb_strlen($v['username']);
                $str1 = mb_substr($v['username'],0,1);
                $str2 = mb_substr($v['username'],$len-2,1);
                $game = $v['gi_name'];
                $third = $v['tc_name'];
                $username = $str1.'****'.$str2;
                $amount = sprintf("%.2f",$v['gb_winprice']);
                $msg_data = ['third'=>$third,'game'=>$game,'username'=>$username,'amount'=>$amount,'currency'=>$currency];
                $text = "🎉恭喜玩家{:username}，在<b>{:third}</b>平台，<b>{:game}</b>游戏，喜中<b><u>{:amount}</u>{:currency}</b>🎉";
                $content .= lang($text, $msg_data,strtolower($range))."\n";
            }
        }

        $data = [
            'chat_id' => $chat_id,
            'text' => $content,
            'parse_mode' => 'HTML',
        ];
        $result = Request::sendMessage($data);
        $this->log($result);
    }

    public function log($result,$ste = 1) {
        $count = env('bot.log_status',0);
        if (!$result->isOk()) {
            Utils::L('bot_error', $result);
        }
        if($count) {
            Utils::L('bot_message', $result);
        }
    }

    public function content($text) {
        return str_replace(
            ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!', ],
            ['\_', '\*', '\[', '\]', '\(', '\)', '\~', '\`', '\>', '\#', '\+', '\-', '\=', '\|', '\{', '\}', '\.', '\!', ],
            $text);
    }

}