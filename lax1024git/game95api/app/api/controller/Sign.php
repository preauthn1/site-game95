<?php

namespace app\api\controller;

use app\api\factory\SignFactory;
use think\Request;

class Sign{

    //签到任务
    public function getSign(Request $request){
        return (new SignFactory())->getSignActivity($request->token->uid);
    }

    //签到
    public function userSign(Request $request){
        return (new SignFactory())->userSign($request->token->uid);
    }

    //补签
    public function addSign(Request $request){
        return (new SignFactory())->addSign($request->token->uid);
    }

    //更多签到
    public function moreSign(Request $request){
        return (new SignFactory())->getMoreReward($request->token->uid);
    }
}