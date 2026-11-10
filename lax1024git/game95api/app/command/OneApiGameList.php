<?php

declare (strict_types = 1);

namespace app\command;

use app\api\redis\ApiRedis;
use app\common\FastGame\Third_oneapi;
use app\common\game\GameRequest;
use app\common\model\GameInfosModel;
use app\common\model\GamesModel;
use app\model\ThirdConfigs;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\Output;
use think\facade\Db;

class OneApiGameList extends Command{

    protected function configure()
    {
        // 指令配置
        $this->setName('oneapi')
            ->setDescription('oneapi game list');
    }


    protected function execute(Input $input, Output $output){
        $limit = 500;
        $apiRedis=new ApiRedis();

        //获取oneapi集合平台
        $platformList = ThirdConfigs::where('tc_set_code', '=', 'ONEAPI')->select();
        $thirdOneapi = new Third_oneapi();
        foreach ($platformList as $v){
            $page = 1;
            $key = 'oneapi_page_'.$v['tc_id'];
            if( $apiRedis->has($key) ){
                $page = $apiRedis->get($key);
            }
            //获取指定游戏游戏列表
            $url = $v['tc_api_urlpre'].'/game/list';
            $params = [
                'traceId' => $thirdOneapi->generateUUID(),
                'vendorCode' => $v['tc_name'],
                'pageNo' => $page,
                'pageSize' => $limit
            ];
            $header = [
                'Content-type: application/json',
                'X-API-Key: ' . $v['tc_api_prikey'],
                'X-Signature: ' . $thirdOneapi->createSignature($v['tc_api_signkey'], $params),
                // 'Content-Length:' => strlen($params),
            ];
            // 增加HTTP代理请求
            $isProxy = env('IS_REQUIRE_GAME_PROXY', '');
            $proxy = '';
            if ($isProxy) {
                $proxy = env('GAME_PROXY_URL', '');
            }
            $res = json_decode(GameRequest::curl_post($url, json_encode($params), $header, $proxy), true);
            if( isset($res['data']['games']) ){
                $gameList = $res['data']['games'];
                foreach ($gameList as $_v){
                    //判断是否存在
                    if( GamesModel::where('g_code', '=', $_v[0])->value('g_id') ){
                        continue;
                    }
                    //写入游戏表
                    $game = [];
                    $game['g_tcid'] = $v['tc_id'];
                    $game['g_web_tcid'] = $v['tc_id'];
                    $game['g_code'] = $game['g_tag'] = $_v[0];
                    $game['g_icon'] = $_v[3];
                    $game['g_keyword'] = $_v[1];
                    $game['g_type'] = 25;
                    $gid = (new GamesModel())->insertGetId($game);
                    //写入游戏信息表
                    $gameInfo = [];
                    $gameInfo['gi_gid'] = $gid;
                    $gameInfo['gi_lang'] = 'CN';
                    $gameInfo['gi_name'] = $_v[1];
                    $gameInfo['gi_headimg'] = $_v[3];
                    (new GameInfosModel())->insert($gameInfo);
                    Db::name('game_configs')->insertGetId(["gc_gid" => $gid]);
                }
                if( count($gameList) < $limit ){
                    $page = 1;
                }else{
                    $page++;
                }
                $apiRedis->set($key, $page, 86400);
            }
        }
        \app\common\FastGame\Base\Game::buildGamesInfoCache(true);
    }
}