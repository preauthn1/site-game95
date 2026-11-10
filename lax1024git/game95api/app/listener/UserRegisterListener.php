<?php

namespace app\listener;

use app\common\model\AdsChannelModel;

class UserRegisterListener
{

    /**
     * 事件监听处理
     *
     * @return mixed
     */
    public function handle(\app\event\UserRegisterEvent $event)
    {
        $user = $event->user;
        if (isset($user['ac_id']) && $user['ac_id'] > 0) {
            // 增加渠道统计
            $channel = AdsChannelModel::where('ac_id', $user['ac_id'])->find();
            if (!empty($channel)) {
                $channel->ac_user += 1;
                $channel->ac_reg_time = $user['add_time'];
                $channel->save();
            }
        }

    }
}