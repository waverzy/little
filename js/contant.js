/* ########################################################################## */
/* #################      服务器       ###################################### */
/* ########################################################################## */
/**
 * 服务器URL
 */
const user_href_name = 'head.html?name=static/';
const user_href_title = '&title=';

const SERVER_URL = "http://www.wanjudaojia.com/";


/**
 *
 */
const API_URL = "Public/toyapi/?service=";

//预加载图片后缀 用于排序界面
var img_ios = '?imageView2/2/w/100/format/jpg/interlace/1/q/100';
var img_ios640 = '?imageView2/2/w/640/format/jpg/interlace/1/q/100';
var img_ios320 = '?imageView2/2/w/320/format/jpg/interlace/1/q/100';

const qiniu_ak = 'zsIx6WggnHdvxkMPMHV-STK25YplBvpOWepb1gT3';
const qiniu_sk = 'BYPKQX1pbvJQG8cbrxCe5lOMoHjuleTZTcudV5-A';
const qiniu_pr = 'http://o6r1e30ov.bkt.clouddn.com';
const qiniu_scope = 'toys-to-home';
const qiniu_link = 'http://o6r1e30ov.bkt.clouddn.com/';
const winxin_href = 'http%3a%2f%2fwww.wanjudaojia.com%2fmobile%2fwXLogin.html';



/* ########################################################################## */
/* #################      API接口      ###################################### */
/* ########################################################################## */

const API_C_GetAllCategory         ="Category.GetAllCategory";       // 获取分类 用于获取月龄分类、能力分类、品牌分类
const API_C_GetItemWithCategory    ="Category.GetItemWithCategory";  // 分类搜索  用于分类搜索返回商品列表
const API_H_GetCartNum             ="Home.GetCartNum";               // 获取用户购物车商品数量  用于获取购物车商品数量统计结果
const API_H_GetCityList            ="Home.GetCityList";              // 获取城市  用于获取城市列表
const API_H_GetItemDetail          ="Home.GetItemDetail";            // 商品详情  用于获取商品详情
const API_H_getItemComment          ="Home.getItemComment";            // 商品详情  用于获取商品详情
const API_U_getDiscountTicket          ="User.getDiscountTicket";            // 会员优惠券  用于获取会员优惠券
const API_U_duiUserHui          ="User.duiUserHui";            // 会员优惠券兑换
const API_U_userShuhuui         ="User.userShuhuui";            // 会员发起赎回按钮轻轻
const API_P_weiXinShare         ="Passport.weiXinShare";            // 微信分享


const API_H_packageDetails         ="Home.packageDetails"            // 套餐详情  用于获取套餐详情
const API_U_addFavorite            ="User.addFavorite";              // 添加关注  用于商品或套餐的关注或取消
const API_CART_BookingRegistration ="Home.BookingRegistration"       //预约登记 用于缺货时预约登记
const API_H_GetPageData            ="Home.getPageData";              // 设置轮播图片  用于获取轮播图信息
const API_H_GetMobilePhpne            ="Home.GetMobilePhpne";              // 获取客服电话
const API_H_GetTopicActivity       ="Home.GetTopicActivity";         // 专题活动列表  用于获取专题活动列表
const API_H_GetTopicActivityDetail ="Home.GetTopicActivityDetail";   // 专题活动详情  用于获取专题活动详情
/*const API_H_GetToyPackage          ="Home.GetToyPackage";            // 玩具套餐  用于获取玩具套餐列表*/
const API_H_SetCity                ="Home.SetCity";                  // 设置城市  用于设置所在城市
const API_H_GetMySearchData        = "Home.getMySearchData";         //用于获取最近我的搜索
const API_H_GetAllToy              = "Home.GetAllToy";               //自由搭配
const API_H_deleMySearch           ='Home.deleMySearch';             //删除我最近的搜索
const API_H_addMySearch           ='Home.addMySearch';             //删除我最近的搜索
const API_U_GetBaseInfo            ="User.GetBaseInfo";              // 获取用户基本信息  用于获取单个用户基本信息
const API_U_GetMultiBaseInfo       ="User.GetMultiBaseInfo";         // 批量获取用户基本信息  用于获取多个用户基本信息
const API_CART_GetCartItem = "cart.getCartItem";  //用于获取用户购物车商品
const API_CART_modifyItem='cart.modifyItem'; //购物车变化
const API_CART_selectItem='cart.selectItem';  //购物车选中
const API_CART_selectAllItem='cart.selectAllItem';  //购物车全选
const API_H_addWish='Home.addWish';  //添加 取消心愿单
const API_H_isItemEditComment='Home.isItemEditComment';  //商品是否能评论

const API_CART_getAllCartItem='cart.getAllCartItem';  //获取所有购物车商品
const API_CART_deleteCartItem='cart.deleteCartItem';  //删除购物车商品
const API_CART_orderConfirmation='cart.orderConfirmation';  //确认订单
const API_USER_GetAddressList='User.GetAddressList';  //我的收货地址列表
const API_M_GetMemberInfo='Member.GetMemberInfo';     //会员中心
const API_M_GetVipCardDetail ='Member.GetVipCardDetail'; //会员卡详情
const API_M_getAllVipCard='Member.getAllVipCard';//获取会员卡信息
const API_P_sendVerifycode = 'Passport.sendVerifycode';  //注册获取短信验证码
const API_P_register        = 'Passport.register';        //注册操作
const API_H_GetToyPackage='Home.GetToyPackage';//套餐列表
const API_P_login           = 'Passport.login';           //登录操作
const API_P_findPassword   = 'Passport.findPassword';    //找回密码操作
const API_P_wxLoginFirst   = 'Passport.wxLoginFirst';    //微信第一次登录
const API_P_appwxLoginFirst   = 'Passport.appwxLoginFirst';    //app微信第一次登录
const API_P_imgCode   = 'Passport.imgCode';             //获取图片验证码
const API_P_appWXLogin   = 'Passport.appWXLogin';//app微信登录
const API_U_getMessageList = 'User.getMessageList' //消息中心
const API_U_leaveMsg='User.leaveMsg' //意见反馈

const API_Member_isCurUserVip='Member.isCurUserVip';  //判断是否是vip
const API_USER_setAddress='User.setAddress';  //设置默认收货地址
const API_USER_DeleteUserAddress='User.DeleteUserAddress';  //删除收货地址
const API_USER_getAddressDetail='User.getAddressDetail';//收货地址详情
const API_USER_getRegionByCityId='User.getRegionByCityId';//根据市获取省
const API_USER_isSelCardEffective='User.isSelCardEffective';//判断选中的会员卡是否有效
const API_USER_cardCheckout='User.cardCheckout';//会员卡购买 添加trade_card表
const API_USER_orderPayInit='User.orderPayInit';//根据会员卡订单主键id获取界面支付信息
const API_USER_changeTradeCardPay='User.changeTradeCardPay';//修改订单支付方式
const API_USER_changePCTradeCardPay='User.changePCTradeCardPay';//修改赔偿订单支付方式


/*const API_USER_check_done='User.check_done';//订单结算*/
const API_Pay_index='Pay.index';//订单结算
const API_Pay_getmoney='Pay.getmoney';//订单结算

const API_alizhifuPay_index='AlizhifuPay.index';//app阿里订单结算
const API_weixinPay_index='WeixinPay.index';//app微信订单结算



const API_USER_editUserAddress='User.editUserAddress';//新增编辑收货地址

const API_U_privateLetter='User.privateLetter'//个人私信
const API_H_inviteHistory='Home.inviteHistory'//分享、邀请历史

const API_P_weixinLogin           = 'Passport.weixinLogin';           //登录操作
const API_H_getWishList='Home.getWishList' //心愿单列表
const API_H_setWishSort='Home.setWishSort'//心愿排序
const API_H_setWishSortNew ='Home.setWishSortNew'//心愿排序
const API_H_EvaluationList='User.EvaluationList'//评价列表
const API_H_addEvaluation='User.addEvaluation'//添加评价
const API_H_getTradeItem='User.getTradeItem'//获取评价列表详细信息
const API_H_getTradeRate='User.getTradeRate'//获取已评价详情
const API_H_getMemberInfo='Member.getMemberInfo';//会员中心
const API_M_exchangeVipWithCode='Member.exchangeVipWithCode'//兑换码领取
const API_U_getPersonalInfo='User.getPersonalInfo'//获取用户信息
const API_U_editPersonalInfo='User.editPersonalInfo'//修改用户信息
const API_U_expenseCalendar='User.expenseCalendar'//消息记录
const API_H_getParty='Home.getParty'//提交宝宝party
const API_CART_getWishListCount     = 'cart.getWishListCount  ';//获取心愿单商品数量
const API_CART_isHasDefaultAddress     = 'cart.isHasDefaultAddress  ';//判断是否有默认收获地址
const API_CART_orderTradeItemCreate='cart.orderTradeItemCreate';  //订单创建
const API_CART_nextOrderTradeItemCreate='cart.nextOrderTradeItemCreate'; //创建下个订单
const API_U_currentToy='User.currentToy';//当前玩具，下一个玩具
const API_U_nextToy='User.nextToy';//下一个玩具
const API_U_changePassword = 'User.changePassword';//修改密码
const API_CART_startHuiShouToy='Cart.startHuiShouToy';//我的订单退还玩具

const API_U_getUserCompensation = 'User.getUserCompensation';//获取用户赔偿单信息
const API_P_loginInit   = 'Passport.loginInit';    //登录初始化
const API_U_messageDetail = 'User.messageDetail';//消息详情

const SPEED_FADEOUT=200;
const SPEED_DELAY=200;
const SPEED_STYLE="fast";



/* ########################################################################## */
/* #################      存储空间      ###################################### */
/* ########################################################################## */
/** 个推 用CID */
const LS_CID = 'clientid';
/** 手机系统 */
const LS_OS = 'os';
/** 是否安装微信 */
const LS_HAVE_WEIXIN = 'have_weixin';
/** 是否安装微博 */
const LS_HAVE_WEIBO = 'have_weibo';
/**个人中心分享页面邀请码**/
const LS_INVITE_CODE = 'inviteCode';
/**缓存邀请码,使用在详情页链接**/
const DETAIL_CODE = 'code';
/**宝宝月龄**/
const BABY_AGE= 'baby_month';
/**微信第一次登录openid**/
const OPENID   = 'openid';
const AVATAR   = 'avatar';
/**注册跳回之前浏览页面**/
const REGISTER_REFERER = 'register_referrer';


/* ########################################################################## */
/* #################      首页图片配置   #################################### */
/* ########################################################################## */
/*新手福利链接*/
const NEW_COMER_HREF = "static/newWelfare.html";  //只这一个地方
/*邀请有礼链接*/
const INVI_GIFT_HREF = "static/inviteGift.html";   //只这一个地方
/*消费承诺链接*/
const CONSUME_PROMISE_HREF = "static/customPromise.html";   //只这一个地方
/**/
const REARING_KITS_HREF = "static/rearingKits.html";   //只这一个地方


const up_qiniu_link = 'http://o6zo3xy1k.bkt.clouddn.com/';
//详情页面评价每次加载条数
const comment_page = 20;   //与接口中【comment_page】一致
//微信中首页、分享给好友页面分享图片
const share_register_img = up_qiniu_link + 'favicon.png' + img_ios;
//分享给好友右边广告内容
const share_content = "玩具到家，畅玩全世界的好玩具！开启宝宝专属全球玩具箱！";
//微信分享链接
const weixin_share_href = SERVER_URL + "mobile/static/invite.html";


/**
 * 玩具套餐
 * TOY_GROUP_SRC 图片地址
 * TOY_GROUP_NAME 图片名称
 * TOY_GROUP_DESC 图片描述
 * TOY_GROUP_HREF 图片链接
 * @type {string}
 */
const TOY_GROUP_SRC = up_qiniu_link+"index_variety.png"+img_ios640;
const TOY_GROUP_NAME = "品牌玩具随心选";
const TOY_GROUP_HREF = "varity.html";

/**
 * 全球新品同步
 * NEWS_SYNC_SRC 图片地址
 * NEWS_SYNC_NAME 图片名称
 * NEWS_SYNC_HREF 图片链接
 * @type {string}
 */
const NEWS_SYNC_SRC = up_qiniu_link+"index_newGoods.png"+img_ios640;
const NEWS_SYNC_NAME = "全球新品同步";
const NEWS_SYNC_HREF = "varity.html?if_new=1";

/**
 * 给宝宝办聚会
 * BABY_PARTY_SRC 图片地址
 * BABY_PARTY_NAME 图片名称
 * BABY_PARTY_HREF 图片链接
 * @type {string}
 */
const BABY_PARTY_SRC = up_qiniu_link+"index_babyParty.png"+img_ios640;
const BABY_PARTY_NAME = "给宝宝办聚会";
const BABY_PARTY_HREF = "babyParty.html";

/**
 * 历史专题活动
 * BABY_PARTY_SRC 图片地址
 * BABY_PARTY_NAME 图片名称
 * BABY_PARTY_HREF 图片链接
 * @type {string}
 */
const HISTORY_TOPIC_SRC = up_qiniu_link+"/index_historyTopic.png"+img_ios640;
const HISTORY_TOPIC_NAME = "历史专题活动";
const HISTORY_TOPIC_HREF = "thematicActivityList.html";

//最小心愿单数量
var min_wish_count = 4;   //与接口中【minWish】一致




