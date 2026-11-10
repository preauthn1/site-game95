<?php

namespace app\common\FastGame;

use app\common\FastGame\Base\Third;
use app\common\Utils;

class Third_cq9 extends Third
{

    function MakeSign($config, &$data)
    {
        $head_sign = $config['trdcfg']["tc_token"];
        return compact('head_sign');
    }

    function CheckSign($config, $data)
    {
        // TODO: Implement CheckSign() method.
    }

    function TokenTimestampTranser($in)
    {
        // TODO: Implement TokenTimestampTranser() method.
    }

    function transOtherKvs(&$kvs)
    {
        $platform = $kvs['platform'] ?? 0;
        $kvs['platForm'] = $platform == 1 ? 'web' : 'mobile'; //平台标识 1 web 2 h5  3 mobile  'platform' 1 PC   2 手机
    }
}