<?php
namespace app\manage\controller;
use app\common\model\ArtificialBalanceModel;
use app\common\model\UserAdminLogModel;
use app\common\model\UserBalanceMxModel;
use app\common\model\UserModel;
use app\common\lib\Respons;
use app\common\service\MemberService;
use app\manage\factory\ArtificialBalanceFactory;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use app\common\lib\Uploads;
use app\common\lib\Util;
use app\common\Utils;
use think\Request;
use think\facade\View;
use think\facade\Session;
use think\facade\Db;
use app\common\redis\CommomRedis;
use think\facade\Queue;

class ArtificialBalance extends Base
{	
    protected $middleware = ['ManageCheckLogin',"Language"];

    //列表
    public function list(\think\Request $request){
        $rsps = (new ArtificialBalanceFactory($request->token->uid))->list();
        return $rsps;
    }

    //添加
    public function add(Request $request){
    	$param = $request->param();
        $info=$param['info'];
        if ($info['username']== '' || empty($info['username'])) {
            return Respons::run(0,[],lang('请选择用户'));
        }
        
        if ($info['price']<=0 || $info['price']=='') {
                return Respons::run(0,[],lang('请输入调整金额'));
        }
        $info['water'] = intval($info['water']);

        Db::startTrans();
        try {
            $uids = explode(",", $info['username']);
            foreach($uids as $val){
                $user = UserModel::where("id", $val)->find();
                if (!isset($user['id'])) {
                    throw new \Exception(lang("用户不存在"), 1);
                }
                if(!isset($info['mx_msg'])) $info['mx_msg'] = '';
                if ($info['a_type']==1) {
                    $mx_msg = $info['mx_msg']==''?"余额增加":$info['mx_msg'];
                    $mx = UserModel::cz_balance($user['id'],$info['price'],"+",true,$mx_msg, 3);
                    $admin_msg = "人工调整余额";
                    $fee = sprintf("%.2f",$info['price']*$info['water']);
                    UserModel::where(['id' => $user['id']])->inc("savings", $fee)->update();  //储蓄字段 充值增加
                    MemberService::addUserWaterDetail($user['id'], $fee, 7, '人工调整余额');
                }elseif($info['a_type']==2){
                    $mx_msg = $info['mx_msg']==''?"余额减少":$info['mx_msg'];
                    $mx = UserModel::cz_balance($user['id'],$info['price'],"-",true,$mx_msg, 4);
                    $admin_msg = "人工调整余额";
                }elseif ($info['a_type']==3) {
                    $mx_msg = $info['mx_msg']==''?"赠送彩金":$info['mx_msg'];
                    $mx = UserModel::cz_balance($user['id'],$info['price'],"+",true,$mx_msg, 12, $info['water']);
                    $admin_msg = "赠送彩金";
                }

                if (!isset($mx['id'])) {
                    return Respons::run(0,'',lang("明细数据错误"));
                }
                $add['admin_name'] = Session::get("adminInfo.name");
                $add['a_type'] = $info['a_type'];
                $add['uid'] = $user['id'];
                $add['mx_id'] = $mx['id'];
                $add['price'] = $info['price'];
                $add['water'] = $info['water'];
                $add['add_time'] = time();
                $add['lebal']= $user['lebal'];
                $add['msg'] = $mx_msg;
                ArtificialBalanceModel::insert($add);
                UserAdminLogModel::add_log($user['id'], $admin_msg, Session::get("adminInfo.name"));
            }
            // 提交事务
            Db::commit();
            return Respons::run(1,'','','',$info,new ArtificialBalanceModel(),lang('人工调整添加'));
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            return Respons::run(0,[],$e->getMessage());
        }
    }
    
    //列表
    public function excel(Request $request){
        $param = $request->param();   
        $where=[];
//        $ArtificialBalanceModel =new ArtificialBalanceModel();
        $accurate = isset($param['accurate'])?$param['accurate']:0;
        if (isset($param['username']) && !empty($param['username'])) {
            $where_field = is_numeric($param['username']) ? 'id|username|mail|phone' : 'username|mail|phone';
            $uids = UserModel::where([[$where_field,'=',$param['username']]])->value("id");
            $where[] = ["a.uid","=", $uids];
        }
        if (isset($param['username']) && $param['username']!='' && $accurate == 1) {
            $where[]=["c.username","=", $param['username']];
        }
        if (isset($param['date']) && $param['date']!='') {
            $time=explode(" - ",$param['date']);
            $where[]=["b.add_time",">=", Utils::getQueryDateTime($time[0])];
            $where[]=["b.add_time","<=", Utils::getQueryDateTime($time[1], true)];
        }
        if (isset($param['lebal']) && $param['lebal']!='') {
            $where[]=["c.lebal","=",$param['lebal']];
        }
        if(isset($param['uid']) && $param['uid'] > 0){
            $where[] = ['b.uid','=',$param['uid']];
        }
        if(isset($param['a_type']) && $param['a_type'] > 0){
            $where[] = ['a.a_type','=',$param['a_type']];
        }else if(isset($param['a_types']) && $param['a_types'] > 0){
            $where[] = ['a.a_type','=',$param['a_types']];
        }
        $res = ArtificialBalanceModel::alias("a")
            ->join("dq_user_balance_mx b","a.mx_id=b.id")
            ->join("dq_user c","b.uid=c.id")
            ->where($where)
            ->order("a.id desc")
            ->field("a.*,b.add_time,b.old_price,b.new_price,b.price,b.msg,c.lebal")
            ->select();

        
        $data = [];
        if (!empty($res)) {            
            // 从 A2 开始填充数据
            foreach ($res as $k => $v) {
                $v['lebal'] = ($v['lebal']==1?lang('一般账号'):lang('测试账号'));
                $v['a_type'] = ($v['a_type']==1?lang('人工增加'):($v['a_type']==2?lang('人工减少'):lang('赠送彩金')));
                $v['add_time'] = date("Y-m-d H:i:s",$v['add_time']);
                $data[] = [
                    $v['uid'],$v['lebal'],$v['a_type'],$v['price'],$v['old_price'],$v['new_price'],$v['msg'],$v['admin_name'],$v['add_time']
                ];
            }
        }
        
        $header = [
            lang('用户uid'),lang('用户标签'),lang('类型'),lang('调整金额'),lang('调整前'),lang('调整后'),lang('明细备注'),
            lang('操作人'),lang('操作时间')
        ];
        $file_name = genCsv($header,$data,lang('人工调整数据').date('YmdHis',time()), false);
        $s3_url = Uploads::uploadS3(public_path() . $file_name);
        Utils::addOptLogByHandle('人工调整数据导出');
        return $this->success([
            'data' => $s3_url ?: toMedia($file_name, '')
        ]);
    }
    
    public function import(Request $request){
        if(!empty($_FILES)){
            $files = Uploads::upload_excel();
            if($files['code'] == 0){
                return Respons::run($files);
            }
            $file = $files['data']['file'];
            $objReader = IOFactory::createReader('Xlsx');

            // 启动事务
//            Db::startTrans();
            try{
                $objPHPExcel = $objReader->load($file);
                $sheet = $objPHPExcel->getSheet(0);
                $highestRow = $sheet->getHighestRow();
                $items = [];
                for ($i = 2; $i <= $highestRow; $i++) {                    
                    $items[$i] = [
                        'username' => $objPHPExcel->getActiveSheet()->getCell("A" . $i)->getValue(),
                        'price' => $objPHPExcel->getActiveSheet()->getCell("B" . $i)->getValue(),
                        'water' => $objPHPExcel->getActiveSheet()->getCell("C" . $i)->getValue(),
                        'a_type' => $objPHPExcel->getActiveSheet()->getCell("D" . $i)->getValue(),
                        'msg' => $objPHPExcel->getActiveSheet()->getCell("E" . $i)->getValue(),
                    ];
                }

                foreach($items as $key => $val){
                    $val['admin_name'] = Session::get("adminInfo.name");
                    Queue::push('ImportHandle@artificial', $val, 'import');
                }
//                Db::commit();
                return json(["code" => 1]);
            }catch (\Throwable $t){
//                Db::rollback();
                return Respons::run(0,[],$t->getMessage());
            }
        }
        return View::fetch('artificial_balance/import');
    }

    public function set_water(Request $request){
        $param = $request->param();
        if (!isset($param['id'])) {
            return Respons::run(0,[],lang('数据不存在'));
        }
        $data = ArtificialBalanceModel::where('id',$param['id'])->field('id,mx_id,water,price')->find();
        $upd['id'] = $param['id'];
        $upd['water'] = $param['water'];
        $res = ArtificialBalanceModel::update($upd);
        if($res){
            $new_water = ($param['water'] * $data['price']) - ($data['water'] * $data['price']); //新的流水金额
            $uid = UserBalanceMxModel::where(['id'=>$data['mx_id']])->value('uid');
            UserModel::where(['id' => $uid])->inc("savings", $new_water)->update();  //储蓄字段 充值增加
            MemberService::addUserWaterDetail($uid, $new_water, 7, '人工调整赠送彩金');
        }
        return Respons::run(1,'','',$data,$upd,new ArtificialBalanceModel(),lang('人工调整修改'));
    }
}