<?php

namespace app\manage\controller;

use app\common\lib\Respons;
use app\common\model\UserLevelModel;
use app\common\model\UserModel;
use app\common\model\UserVerifyModel;
use app\common\service\MemberService;
use think\Request;

class UserVerify
{

    //列表
    public function lists(\think\Request $request)
    {
        $param = \think\facade\Request::param();
        $page = $param['page'] ?? 1;
        $limit = $param['limit'] ?? 10;
        $condition = [];
        $user_verify_model = new UserVerifyModel();
        if (isset($param['type']) && $param['type'] !== '') {
            $condition[] = ['type', '=', $param['type']];
        }
        $rsps = $user_verify_model
            ->field('*')->where($condition)
            ->order("id desc")
            ->paginate($limit, false, ['query' => $param]);
        $rsps = json_decode(json_encode($rsps),true);
        $UserLevelModel = new UserLevelModel();
        $UserModel = new UserModel();
        $user_level_data = $UserLevelModel->column('level_name', 'id');
        foreach($rsps['data'] as $k => $value){
            $user_data = $UserModel->where('id',$value['uid'])->find();
            $rsps['data'][$k]['tags'] = MemberService::getTagByUid($value['uid']);
            $rsps['data'][$k]['rec_code'] = $user_data['rec_code'];
            $rsps['data'][$k]['level_name'] = $user_level_data[$user_data['level_id']];
            $rsps['data'][$k]['username'] = MemberService::getUsernameByUid($value['uid']);
        }
        $outdata['data'] = $rsps;
        $outdata['code'] = 1;
        return Respons::run($outdata);
    }

    //添加
    public function add(Request $request)
    {
        $param = $request->param();
        if (isset($param['add'])) {
            $info = $param['info'];
            unset($info['id']);
            $res = UserVerifyModel::insertGetId($info);
            $info['id'] = $res;
            return Respons::run($res ? 1 : 0, '', '', '', $info, new UserVerifyModel(), lang('userverify添加'));
        }
    }


    //编辑
    public function edit(Request $request)
    {
        $param = $request->param();
        $user_verify_model = new UserVerifyModel();
        if (isset($param['edit'])) {
            $info = $param['info'];
            $data = $user_verify_model->where('id', $info['id'])->find();
            $res = $user_verify_model->update($info);
            return Respons::run($res ? 1 : 0, '', '', $data, $info, $user_verify_model, lang('userverify修改'));
        }
        if (isset($param['find'])) {
            $res = $user_verify_model->where("id", $param['id'])->find();
            if(!empty($res['content'])){
                $res['content_json'] = json_decode($res['content'],true);
            }else{
                $res['content_json'] = [];
            }
            return Respons::run(1, $res);
        }
    }

    //删除
    public function delete(Request $request)
    {
        $param = $request->param();
        if (isset($param['delete'])) {
            $id = $param['id'];
            $user_verify_model = new UserVerifyModel();
            $res = $user_verify_model->where("id", "in", $id)->delete();
            return Respons::run($res ? 1 : 0, '', '', $param, '', $user_verify_model, lang('userverify删除'));
        }
    }
}