<?php
declare (strict_types=1);

namespace app\command;

use app\common\FastGame\Base\Http;
use app\common\FastGame\Base\Params;
use app\common\FastGame\Base\Utils;
use app\common\FastGame\Third_ogs;
use app\common\lib\ActiveReport;
use app\common\model\ThirdCostLogsModel;
use app\common\service\BetService;
use app\model\Games;
use app\common\lib\ReportExport;
use app\common\lib\Util;
use app\common\model\ExportReportsModel;
use app\common\model\PaySetModel;
use app\common\model\UserModel;
use app\common\model\UserOfflineModel;
use app\common\payment\Entry;
use app\common\service\MemberService;
use app\manage\factory\GameBetsFactory;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\console\input\Argument;
use think\console\input\Option;
use app\api\redis\ApiRedis;
use think\facade\Queue;
use think\facade\Log;

class Test extends Command
{

    protected function configure()
    {
        $this->setName('test')->setDescription('专用测试命令，用于开发调试');
    }

    protected function execute(Input $input, Output $output)
    {

        print_r(strtotime('2024-10-21 12:40:03'));
//        echo "start__".time();
//        // 获取三方游戏中余额
//        $third_balance = MemberService::getThirdAllBalance(48);
//        print_r($third_balance);
//        echo "end____".time();
        exit();
        //{
        // "user_id": "player406",
        // "site_id": "xiaohao4VNDK",
        // "type": "signout",
        // "amount": 0,
        // "auth_code": "fhEY0Svbyef3Kf7lM1MgtY9ux",
        // "timestamp": "1708002123",
        // "signature": "3b93737ae8f9c74440dca95c9993b04b"
        //}
        $trace_id = "1728646975232395";
        $data = [
            'app_id' => '511',
            'end_time' => 1728663025,
            'page' => 1,
            'size' => 3000,
            'start_time' => 1728662725
        ];
        ksort($data);
        $string = json_encode($data);
        print_r($string);
        echo md5("trace_id=$trace_id{$string}9d32ef2ff7c28e079f07c0e202ba4360");

        exit();
        //ActiveReport::runtask();
        /*for($i=0;$i<500;$i++) {
            ActiveReport::runtask();
        }*/
        //print_r(ActiveReport::getActiveDatas('d',20231001,20231101));*/
        /*BetService::cacheBetIdByTime();
        Utils::L('test',BetService::getGbidByTime(1706634900,1708370100,'gb_intime'));
        Utils::L('test',BetService::getGbidByTime(1006104199,1708870100,'gb_bettime'));
        Utils::L('test',BetService::getGbidByTime(1706634900,1908870099,'gb_overtime'));*/
        //Utils::L('test',ExportReportsModel::getlist());
        //ReportExport::testExportList();
        //UserBxModel::recoverBxitem(52);
//       echo MemberService::getRechargeByUid(98);
        //UserBxModel::bxPorcByRegister(68,65,1705957336);
        //UserBxModel::bxPorcByRecharge(65,200,1,1705957336);
        //print_r(UserBxModel::getDaycntByUid(65,20240122));
        //var_dump(UserBxModel::addBx(2,1,5));
        //var_dump(UserBxModel::pay(3,65));
        //var_dump(UserBxModel::getlist());
        //print_r(UserBxModel::getLogs(20240122,65));
        //UserBxModel::taskPayBx();

    }

}
