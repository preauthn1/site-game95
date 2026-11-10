<?php

namespace app\common\model;

use think\Model;

class DefaultHeadModel extends Model
{
    protected $name = 'default_head';

    protected $schema = [
        'id' => 'int',
        'name' => 'varchar',
        'url' => 'varchar',
        'sort' => 'tinyint',
        'status' => 'tinyint',
        'add_time' => 'int',
        'update_time' => 'int',
    ];

    //存日志记录字段
    public function getField()
    {
        $field = [
            'id' => 'id',
            'name' => lang('名称'),
            'url' => lang('头像地址'),
            'sort' => lang('排序'),
            'status' => lang('状态'),
        ];
        return ['field' => $field, 'table' => $this->name];
    }

    /**
     * 获取一条头像链接
     * @return mixed|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function getHeadOne()
    {
        $map = [
            'status' => 1
        ];
        $list = DefaultHeadModel::where($map)->field('id,name,url')->select();
        if(empty($list)){
            return "https://d11fblhq41757n.cloudfront.net/storage/head_img/T/1.png";
        }else{
            $len = count($list);
            $index = rand(1,$len);
            if(isset($list[$index])){
                return  $list[$index]['url'];
            }else{
                return "https://d11fblhq41757n.cloudfront.net/storage/head_img/T/1.png";
            }
        }
    }

}