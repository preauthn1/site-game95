<?php


namespace app\common\FastGame;


use app\common\lib\Util;
use app\common\FastGame\Base\{Game, Third, Utils, Http, TaskInterface, ThirdTask};
use app\model\ThirdConfigs;

class ThirdTask_atg extends ThirdTask implements TaskInterface
{

    /**
     * 继承类中开始执行三方平台任务
     * @return mixed
     * @author twt326
     * @date 2022-08-25 12:19
     */
    function exec()
    {
        $cfgvalues=$this->cfgvalues;
        //执行任务
        $this->runThirdTasks();
        $this->runJs($cfgvalues['jsst']);
        $this->runFy($cfgvalues['fyst']);
        $this->runStat($cfgvalues['statst']);
        $this->updateConfigValue();

    }

    /** 根据读取列表的返回数据更新下次游戏列表的开始特征字段值
     * @param $gtag
     * @param $thistime
     * @param $data
     * @return mixed
     * @author twt326
     * @date 2022-09-19 21:26
     */
    function setBetListStartFlag($gtag, $thistime, $data)
    {
        $func = 'GETBETLIST';
        Utils::L('test',['准备保存API配置值', 'gcode'=>$gtag, 'thistime'=>$this, 'cfg'=>$this->apiscfgvalues[$func]]);

        $cfg=json_decode(json_encode($this->apiscfgvalues[$func]),true); //getApiCfgvalues($func,$gcode);
        $upflag = false;
        if (isset($cfg[$gtag])) {
            $upflag = true;
        }
        if ($upflag) $this->updateApiConfigValue($func,$cfg);
    }

    /**
     * 处理一条游戏记录数据为可写入注单表的状态
     * @param $gcode 游戏在三方平台的代码
     * @param $data 游戏注单数据（单条）
     * @return mixed
     * @author twt326
     * @date 2022-09-20 22:00
     */
    function procBetData($gcode, $data)
    {
        return $data;
    }

    //多条数据
    function procBetDataPre($gcfg, $data, $rlt){
        date_default_timezone_set('Asia/Shanghai'); //转三方时区时间
        unset($rlt['return_headers']);
        $data = $rlt;
        $rd[] = [
            'gb_uid'=>0,
            'gb_gid'=>0,
            'gb_uname'=>'',//uid,uname两项中必须有一项有值
            'gb_price'=>0.00,
            'gb_sn'=>'',
            'gb_winlose'=>0,
            'gb_bettime'=>0,
            'gb_overtime'=>0,
            'gb_winprice'=>0.00
        ];
        Third::initExtClass(['trdcfg' => ['tc_code'=> 'ATG' ]]);
        foreach ($data as $v) {
                $gb_price = Third::transExchangerate($v['totalstake'],0);//投注金额
                $winloseamount = Third::transExchangerate(trim($v['winloseamount'],'-'),0);//输赢金额
                if($v['winloseresult'] == 'W'){
                    $gb_winlose = 3;
                    $gb_winprice = $winloseamount+$gb_price;
                }else{
                    $gb_winlose = 2;
                    $gb_winprice = floatval($gb_price - $winloseamount);
                }
                if(in_array($v['status'],['cancel','refund'])){
                    $gb_winlose = 0;
                    $gb_winprice = 0;
                }
                $rd[] = [
                    'gb_op' => 'n',
                    'gb_gid'=>Game::getGamesInfoBy($gcfg['trdcfg']['tc_id'], $v['gamecode'], 'tag', 'g_id'),
                    'gb_uname'=> $v['membername'],
                    'gb_winlose'=>$gb_winlose,
                    'gb_bettime'=>$v['bettingdate'],
                    'gb_overtime'=>$v['settledate'],
                    'gb_price'=>$gb_price,
                    'gb_sn'=> $v['bettingcode'],
                    'gb_winprice'=>$gb_winprice,
                ];
        }
        return empty($data) ? []:$rd;
    }


    /**
     * 获取游戏列表的开始特征字段
     * @param string $gtag 游戏三方代码
     * @param int $thistime 当前调用时间节点
     * @return mixed
     * @author twt326
     * @date 2022-09-18 17:23
     */
    function getBetListStartFlag($gtag,$thistime)
    {
        date_default_timezone_set('Asia/Shanghai'); //转三方时区时间
        $func = 'GETBETLIST';
        $cfg = $this->getApiCfgvalues($func,$gtag);
        $flags = [
            "lastruntime" => $thistime,
            "SDate" =>date('Y-m-d H:i:s', $thistime - 300), //前5分钟
            "EDate" => date('Y-m-d H:i:s', $thistime), //当前时间
        ];
        $this->apiscfgvalues[$func][$gtag] = array_merge($this->apiscfgvalues[$func][$gtag],$flags);
        return $flags;
    }

    /**
     * 重写蕨类的转移数据方法
     * @param $gid
     * @author twt326
     * @date 2022-09-20 22:50
     */
    public function transferBets($gid,$type){
        //业务代码开始
        parent::transferBets($gid,$type);//此处为示例，直接调用基类方法进行转移，如果有特殊数值需要处理，请在此处处理，是否调用基类方法因情而定
        //业务代码结束
    }

    public function runFy($lasttime)
    {
        // TODO: Implement runJs() method.
    }

    public function runJs($lasttime)
    {
        // TODO: Implement runJs() method.
    }

}
