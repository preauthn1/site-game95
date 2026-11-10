<?php


namespace app\common\FastGame;


use app\common\FastGame\Base\{Game, Http, Meta, TaskInterface, Third, ThirdTask, Utils};
use app\common\payment\PayRequest;

class ThirdTask_ogs extends ThirdTask implements TaskInterface
{

    /**
     * 继承类中开始执行三方平台任务
     * @return mixed
     * @author twt326
     * @date 2022-08-25 12:19
     */
    function exec()
    {
        $cfgvalues = $this->cfgvalues;
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
        Utils::L('test', ['准备保存API配置值', 'gcode' => $gtag, 'thistime' => $this, 'cfg' => $this->apiscfgvalues[$func]]);
        $cfg = json_decode(json_encode($this->apiscfgvalues[$func]), true);
        $upflag = false;
        if (isset($cfg[$gtag])) {
            $upflag = true;
            if (isset($data['records'])) {
                if (count($data['records']) > 0) {
                    $cfg[$gtag]['fetch_id'] = $data['records'][count($data['records']) - 1]['fetch_id'];
                }
            }
        }
        if ($upflag) $this->updateApiConfigValue($func, $cfg);
    }

    //多条数据
    function procBetDataPre($gcfg, $data, $rlt)
    {
        date_default_timezone_set('Asia/Shanghai'); //转三方时区时间
        $rd = [];
        foreach ($data as $key => $v) {
            if (strpos($v['player_id'], 'togs_') === 0) {
                $gb_winlose = 1;
                if (!empty($v['credit_at'])) {
                    if ($v['winlose_amount'] > 0) {
                        $gb_winlose = 3;
                    } else {
                        $gb_winlose = 2;
                    }
                } else {
                    $gb_winlose = 0;
                }
                Third::initExtClass(['trdcfg' => ['tc_code' => 'OGS']]);
                $gb_winprice = Third::transExchangerate($v['winlose_amount'], 0, 2);
                $gid = Game::getGamesInfoBy($gcfg['trdcfg']['tc_id'], $v['game_id'], 'tag', 'g_id');
                $rd[] = [
                    'gb_op' => 'n',
                    'gb_gid' => $gid,
                    'gb_uname' => str_replace('togs_', '', $v['player_id']),
                    'gb_winlose' => $gb_winlose,
                    'gb_overtime' => $v['credit_at'],
                    'gb_price' => $v['debit_amount'],
                    'gb_sn' => $v['fetch_id'],
                    'gb_bettime' => $v['debit_at'],
                    'gb_winprice' => $gb_winprice,
                    'gb_cusfield' => $v['fetch_id']
                ];
            }
        }
        return empty($rd) ? [] : $rd;
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


    /**
     * 获取游戏列表的开始特征字段
     * @param string $gtag 游戏三方代码
     * @param int $thistime 当前调用时间节点
     * @return mixed
     * @author twt326
     * @date 2022-09-18 17:23
     */
    function getBetListStartFlag($gtag, $thistime)
    {
        $func = 'GETBETLIST';
        $cfg = $this->getApiCfgvalues($func, $gtag);
        if (isset($cfg['fetch_id'])) {
            $fetch_id = $cfg['fetch_id'];
        } else {
            $fetch_id = 1;
        }
        $limit = 5000;
        $flags = [
            'game_id' => $gtag,
            "limit" => $limit,
            'fetch_id' => $fetch_id,
        ];
        $this->apiscfgvalues[$func][$gtag] = array_merge($this->apiscfgvalues[$func][$gtag], $flags);
        return $flags;
    }

    /**
     * 重写蕨类的转移数据方法
     * @param $gid
     * @author twt326
     * @date 2022-09-20 22:50
     */
    public function transferBets($gid, $type)
    {
        //业务代码开始
        parent::transferBets($gid, $type);//此处为示例，直接调用基类方法进行转移，如果有特殊数值需要处理，请在此处处理，是否调用基类方法因情而定
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
