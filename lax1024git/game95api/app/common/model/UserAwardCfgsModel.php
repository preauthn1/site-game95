<?php

namespace app\common\model;

use think\Model;

class UserAwardCfgsModel extends Model{

    protected $name = 'user_award_cfgs';

    protected $scene = [
        'uac_id'                        => 'int',
        'uac_awardid'                   => 'int',
        'uac_uid'                       => 'int',
        'uac_intime'                    => 'int',
        'uac_money'                     => 'decimal',
        'uac_rate'                      => 'decimal',
        'uac_water'                     => 'decimal',
        'uac_waterdone'                 => 'decimal',
        'uac_gameids'                   => 'varchar',
        'uac_done'                      => 'int',
        'uac_payed'                     => 'int',
        'uac_paytime'                   => 'int',
    ];

    //存日志记录字段
    public function getField(){
        $field = [
            'uac_id'=>'id',
            'uac_awardid'=>lang('优惠类型ID'),
            'uac_uid'=>lang('用户ID'),
            'uac_intime'=>lang('奖励获得时间'),
            'uac_money'=>lang('奖励金额'),
            'uac_rate'=>lang('要求流水倍数'),
            'uac_water'=>lang('要求流水（冗余）'),
            'uac_waterdone'=>lang('已完成流水'),
            'uac_gameids'=>lang('指定游戏统计流水的游戏IDS，用逗号隔开'),
            'uac_done'=>lang('流水完成状态 0 未完成  |完成时间戳'),
            'uac_payed'=>lang('奖励发放状态 0 未发放 1已发放 2不予发放'),
            'uac_paytime'=>lang('奖励发放时间'),
        ];
        $set_key = [];
        return ['field'=>$field,'set_key'=>$set_key,'table'=>$this->name];
    }

    //创建cfgs数据
    public static function createData($apply, $amount){
        //判断活动流水类型
        if( $apply['water_type'] == 1 ){
            //指定平台
            //获取平台对应游戏
            $gameIds = implode(',', GamesModel::where('g_tcid', 'in', $apply['water_type_ids'])->column('g_id'));
        }else{
            //指定游戏
            $gameIds = $apply['water_type_ids'];
        }
        if( !$gameIds ){
            return true;
        }
        $uacid=UserAwardCfgsModel::insertGetId([
            'uac_awardid' => $apply['action_id'],
            'uac_uid' => $apply['uid'],
            'uac_intime' => time(),
            'uac_money' => $amount,
            'uac_rate' => $apply['action_water'],
            'uac_water' => $apply['water'],
            'uac_game_type' => $apply['water_type'],
            'uac_game_type_ids' => $apply['water_type_ids'],
            'uac_gameids' => $gameIds,
        ]);
        $writegameIds=explode(',',$gameIds);
        $writedatas=[];
        foreach ($writegameIds as $v){
            array_push($writedatas,[
                'ual_uacid'=>$uacid,
                'ual_awardid'=>$apply['action_id'],
                'ual_uid'=>$apply['uid'],
                'ual_gid'=>$v,
                'ual_subwater'=>0
            ]);
        }
        (new UserAwardLogsModel())->saveAll($writedatas);
        return true;
    }
}