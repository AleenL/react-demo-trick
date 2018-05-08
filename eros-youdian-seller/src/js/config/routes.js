// 这里的后缀都是 .js 因为打包出来的都是js文件，而不是.vue文件，我们要告诉客户端跳转那个js

//  这里的路径和dev.json路径的区别
//  pages里面配置的是路由跳转的地址，也就是dev生成的 dist文件夹下的js bundle路径 从dist/js开始
//  dev.json 的 exports 需要打包的js地址，填入src的需要被打包成js bundle的地址   从src开始

export default {
    'index': {//tabbar
        url: '/pages/youdianSeller/index.js'
    },
    'main': {//tabbar
        title: '',
        url: '/pages/youdianSeller/main.js'
    },
    'accountManage': {//账号管理
        title: '账号管理',
        url: '/pages/youdianSeller/accountManage/index.js'
    },
    'accountManage.passwordEdit': {//修改密码
        title: '修改密码',
        url: '/pages/youdianSeller/accountManage/passwordEdit.js'
    },
    'accountReceivables.qualificationsinfo': {//填写资质信息
        title: '填写资质信息',
        url: '/pages/youdianSeller/accountReceivables/qualificationsinfo.js'
    },
    'accountReceivables': {//填写收款账号
        title: '填写收款账号',
        url: '/pages/youdianSeller/accountReceivables/index.js'
    },
    'accountReceivables.addarInfo': {//添加收款账号信息
        title: '完善收款账号信息',
        url: '/pages/youdianSeller/accountReceivables/addarInfo.js'
    },
    'chooseProvince': {// 省份选择
        title: '选择省份',
        url: '/pages/youdianSeller/chooseProvince/index.js'
    },
    'chooseCity': {// 省市选择
        title: '选择城市',
        url: '/pages/youdianSeller/chooseProvince/chooseCity.js'
    },
    'areaManage': {//区域管理
        title: '区域管理',
        url: '/pages/youdianSeller/areaManage/index.js'
    },
    'areaManage.addRegion': {//区域管理 新增区域管理
        title: '编辑区域',
        url: '/pages/youdianSeller/areaManage/addRegion.js'
    },
    'billList': {//账单明细列表
        title: '账单明细',
        url: '/pages/youdianSeller/billList/index.js'
    },
    'billList.billInfo': {//账单明细详情
        title: '明细',
        url: '/pages/youdianSeller/billList/billInfo.js'
    },
    'billList.chooseTime': {//账单明细选择时间
        title: '筛选明细',
        url: '/pages/youdianSeller/billList/chooseTime.js'
    },
    'chooseAddress': {//选择地址
        title: '定位地址',
        url: '/pages/youdianSeller/chooseAddress/index.js'
    },
    'chooseDate': {//选择日期
        title: '选择日期',
        url: '/pages/youdianSeller/chooseDate/index.js'
    },
    'chooseWeek': {//选择星期
        title: '选择星期',
        url: '/pages/youdianSeller/chooseWeek/index.js'
    },
    'chooseGoods': {// 选择不参与优惠活动的商品
        title: '选择不参与活动的商品',
        url: '/pages/youdianSeller/chooseGoods/index.js'
    },
    'classifyGoods': {//商品分类管理
        title: '分类管理',
        url: '/pages/youdianSeller/classifyGoods/index.js'
    },
    'classifyGoods.addClassify': {//增加商品分类
        title: '分类名称',
        url: '/pages/youdianSeller/classifyGoods/addClassify.js'
    },
    'couponManage': {//优惠券管理
        title: '优惠券管理',
        url: '/pages/youdianSeller/couponManage/index.js'
    },
    'couponManage.couponinfo': {//优惠券管理详情
        title: '优惠券',
        url: '/pages/youdianSeller/couponManage/couponinfo.js'
    },
    'couponManage.addCouponinfo': {//优惠券管理增加优惠券
        title: '创建优惠券',
        url: '/pages/youdianSeller/couponManage/addCouponinfo.js'
    },
    'couponManage.sendCoupan': {//赠送优惠券
        title: '优惠券列表',
        url: '/pages/youdianSeller/couponManage/sendCoupan.js'
    },
    'discountManage': {//优惠管理
        title: '优惠管理',
        url: '/pages/youdianSeller/discountManage/index.js'
    },
    'discountManage.chooseDiscountType': {//优惠类型
        title: '优惠类型',
        url: '/pages/youdianSeller/discountManage/chooseDiscountType.js'
    },
    'discountManage.createDiscount': {//优惠管理创造优惠
        title: '创建优惠',
        url: '/pages/youdianSeller/discountManage/createDiscount.js'
    },
    'employeeManage': {//员工管理
        url: '/pages/youdianSeller/employeeManage/index.js'
    },
    'employeeManage.addEmployee': {//员工管理增加员工
        title: '新增员工',
        url: '/pages/youdianSeller/employeeManage/addEmployee.js'
    },
    'goodsManage': {//商品管理
        title: '',
        url: '/pages/youdianSeller/goodsManage/index.js'
    },
    'goodsManage.editGoods': {//商品管理增加修改商品
        title: '编辑商品',
        url: '/pages/youdianSeller/goodsManage/editGoods.js'
    },
    'goodsManage.editGoodsItem': {//商品管理增加修改商品
        title: '编辑商品',
        url: '/pages/youdianSeller/goodsManage/editGoodsItem.js'
    },
    'gradeManage': {//职位管理
        title: '职位管理',
        url: '/pages/youdianSeller/gradeManage/index.js'
    },
    'gradeManage.addJob': {//职位管理增加职位
        title: '增加职位',
        url: '/pages/youdianSeller/gradeManage/addJob.js'
    },
    'gradeManage.editJob': {
        title: '编辑职位',
        url: '/pages/youdianSeller/gradeManage/editJob.js'
    },
    'integralManage': {//积分管理
        title: '积分规则',
        url: '/pages/youdianSeller/integralManage/index.js'
    },
    'memberManage': {//会员管理
        title: '',
        url: '/pages/youdianSeller/memberManage/index.js'
    },
    'memberManage.userInfo': {//会员管理详情
        title: '用户详情',
        url: '/pages/youdianSeller/memberManage/userInfo.js'
    },
    'memberOrder': {// 用户订单列表
        title: '用户订单',
        url: '/pages/youdianSeller/memberOrder/index.js'
    },
    'memberOrder.orderInfo': {
        title: '订单详情',
        url: '/pages/youdianSeller/memberOrder/orderInfo.js'
    },
    'orderManage': {//订单管理
        title: '',
        url: '/pages/youdianSeller/orderManage/index.js'
    },
    'regist': {//注册
        title: '输入手机号',
        url: '/pages/youdianSeller/regist/index.js'
    },
    'regist.accountInfoForm': {//注册完善账号
        title: '完善账户信息',
        url: '/pages/youdianSeller/regist/accountInfoForm.js'
    },
    'regist.merchantInfoForm': {//注册完善商户信息
        title: ' ',
        url: '/pages/youdianSeller/regist/merchantInfoForm.js'
    },
    'regist.sendCode': {//注册发送验证码
        title: '输入验证码',
        url: '/pages/youdianSeller/regist/sendCode.js'
    },
    'saveMoney': {//储值
        title: '储值列表',
        url: '/pages/youdianSeller/saveMoney/index.js'
    },
    'saveMoney.addRule': {//储值增加规则
        title: '添加储值',
        url: '/pages/youdianSeller/saveMoney/addRule.js'
    },
    'signIn': {//登录
        title: ' ',
        url: '/pages/youdianSeller/signIn/index.js'
    },
    'storeInfo': {//商铺详情
        title: '门店详情',
        url: '/pages/youdianSeller/storeInfo/index.js'
    },
    'storeInfo.storeInfoEdit': {//商铺详情修改
        title: '详情修改',
        url: '/pages/youdianSeller/storeInfo/storeInfoEdit.js'
    },
    'storeList': {//商铺列表
        url: '/pages/youdianSeller/storeList/index.js'
    },
    'storeList.accountEdit': {//商铺列表账户信息修改
        title: '账户设置',
        url: '/pages/youdianSeller/storeList/accountEdit.js'
    },
    'storeList.accountNameEdit': {//商铺列表修改账户名字
        title: '公司名称设置',
        url: '/pages/youdianSeller/storeList/accountNameEdit.js'
    },
    'storeList.accountSet': {//商铺 账户设置
        title: '设置',
        url: '/pages/youdianSeller/storeList/accountSet.js'
    },
    'storeList.createStore': {//商铺 账户设置
        title: '创建店铺',
        url: '/pages/youdianSeller/storeList/createStore.js'
    },
    'storeSet': {//商铺设置
        title: '设置',
        url: '/pages/youdianSeller/storeSet/index.js'
    },
    'systemGoods': {//系统商品列表。新增商品前一页
        title: '',
        url: '/pages/youdianSeller/systemGoods/index.js'
    },
    'tableManage': {//桌台管理
        title: '桌位管理',
        url: '/pages/youdianSeller/tableManage/index.js'
    },
    'tableManage.addTables': {//桌台管理，增加桌台
        title: '新增桌位',
        url: '/pages/youdianSeller/tableManage/addTables.js'
    },
    'vipCardList': {//会员卡列表
        title: '会员卡',
        url: '/pages/youdianSeller/vipCardList/index.js'
    },
    'vipCardList.addVipCard': {//会员卡列表增加会员卡
        title: '新增会员卡',
        url: '/pages/youdianSeller/vipCardList/addVipCard.js'
    },
    'vipCardList.ChooseTime': {//选择时间
        url: '/pages/youdianSeller/vipCardList/ChooseTime.js'
    },
    'vipCardList.vipCardInfo': {//会员卡详情
        title: '会员卡详情',
        url: '/pages/youdianSeller/vipCardList/vipCardInfo.js'
    }
};
