// 引入
import axios from 'axios'
//服务器IP地址
export const SERVER_IP = 'http://localhost:5000'
//服务器上传图片API地址
export const SERVER_UPLOAD = SERVER_IP + '/shop/upload'

// ---------------------------   获取服务器各类图片地址 ------------------------------------//
//服务器店铺图片地址
export const SERVER_SHOP_IMG = SERVER_IP + '/upload/shop/'
// //服务器商品图片地址
// export const SERVER_GOODS_IMG =  SERVER_IP + '/shop/upload'
// //服务器用户头像图片地址
// export const SERVER_USERS_IMG =  SERVER_IP + '/shop/upload'

axios.defaults.baseURL = SERVER_IP



// 暴露

/* 
// 1,   登录
account：账号
password:密码
*/
export const API_Login = (account,password) => axios.post('/users/checkLogin',{ account,password })
/* 
//2,     添加用户
account：账号
password:密码
userGroup：分组（普通、超级）
*/
export const API_Add = (account,password,userGroup) => axios.post('/users/add',{ account,password,userGroup })

/* 
3,  获取列表账号
currentPage：当前页码
pageSize：每页条数
*/
export const API_LIST = (currentPage,pageSize) => axios.get('/users/list',{params:{ currentPage,pageSize }})
/* 
4,  删除账号
id 删除id
*/
export const API_Del = (id) => axios.get('/users/del',{params:{id}})

/* 
5， 批量批量删除账号
ids:要删除数据的id组成的数组（字符串格式的数组，如: ‘[1, 2, 3]’,需要转为字符串格式）
*/
export const API_Batchdel = (ids)=>axios.get('/users/batchdel',{params:{ids}})


//11，      API: 验证token是否过期
//  token： 用户登录保存的token
export const API_CHECK_TOKEN = (token) => axios.get("/users/checktoken", { params: { token } })


/* 
   7，   检测旧密码是否正确  /users/checkoldpwd
    oldpwd:旧密码   string
    id:账号id   int
 */
export const API_Checkoldpwd = (oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})
/* 

    8， 修改密码：/users/editpwd
    新密码：newPwd string
    账号id：id  int
*/
export const API_Editpwd = (newPwd,id) => axios.post('/users/editpwd',{ newPwd,id })

/* 
6， 修改账号
id
account:账号
userGroup：用户组

*/

export const API_Edit = (id,account,userGroup) => axios.post('/users/edit',{ id,account,userGroup })




/* 10       头像上传
/users/avatar_upload    上传头像
id:登录用户：id

*/
export const API_USER_AVATAR= (id) => axios.post('/users/avatar_upload',{ id })


/*  12，商品添加分类 
/goods/addcate  添加分类
cateName    分类名称
state       是否启用
POST
0 ==== 成功
*/
export const API_GOODS_ADDCATE=(cateName,state)=>axios.post('/goods/addcate',{cateName,state})


//9，   获取用户信息
export const API_GET_PERSONAL = (id) => axios.get("/users/accountinfo", { params: { id } })

/* 
    13,     获取商品分类
/goods/catelist
GET
cateName    分类名称
state       是否启用
*/
export const API_GOODS_CATELIST=(currentPage,pageSize)=>axios.get('/goods/catelist',{ params:{currentPage, pageSize}} )

/* 
        14      ,/goods/delcate   删除分类
get
id
*/
export const API_GOODS_DELCATE=(id)=>axios.get('/goods/delcate',{ params:{ id } })


/* 
15，        修改分类
/goods/editcate
post
id          分类id--int
cateName    分类名称---srting
*/
export const API_GOODS_EDITCATE=(id,cateName,state)=>axios.post('/goods/editcate',{ id,cateName,state })

/* 
    16，查询所有分类名称    /goods/categories   /goods/categories
    get
*/
export const API_GOODS_CATEGORIES=()=>axios.get('/goods/categories',{ params:{} })

/* 
    17,商品图片上传接口     /goods/goods_img_upload
    post
*/
export const API_GOODS_GOODS_IMG_UPLOAD=()=>axios.post('/goods/goods_img_upload',{})

    /*
        18，添加分类        /goods/add      POST
            参数：name:商品名称
        category：商品分类
        price：商品价格
        imgUrl:商品图片地址
        goodsDesc:商品描述
    */
export const API_GOODS_ADD=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{ name,category,price,imgUrl,goodsDesc })


/* 
19.获取商品列表 
/goods/list
GET
currentPage：当前页
pageSize    ：每页条数

 */
export const API_GOODS_LIST=(currentPage,pageSize)=>axios.get('/goods/list',{ params:{currentPage, pageSize}} )

/* 
    20，        删除商品    /goods/del  get
        参数：  id  要删除商品的id
*/
export const API_GOODS_DEL=(id)=>axios.get('/goods/del',{ params:{id}} )

/* 
    21,     修改商品    /goods/edit post
        参数：name:商品名称
        category：商品分类
        price：商品价格
        imgUrl:商品图片地址
        goodsDesc：商品描述
        id：商品id
*/
export const API_GOODS_EDIT=(name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/add',{ name,category,price,imgUrl,goodsDesc,id })

/* 
        22,     22.获取订单列表     /order/list     GET
        参数：  currentPage         当前页码  
                pageSize            每页条数  
                orderNo             订单号  
                consignee           收货人  
                phone               手机号  
                orderState          订单状态  
                date                时间范围
*/
export const API_ORDER_LIST=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/list',{ params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}} )

/* 
    23      查询        /order/search       get
            参数
                    currentPage       当前页码        
                    pageSize          每页条数            
                    orderNo           订单号            
                    consignee         收货人               
                    phone             手机号                
                    orderState        订单状态               
                    date              时间范围                 
*/  
export const API_ORDER_SEARCH=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/search',{ params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}} )

/*      24      24.获取订单详情
    /order/detail       get
        参数：id    订单id
*/

export const API_ORDER_DETAIL=(id)=>axios.get('/order/detail',{ params:{ id }} )

/* 
            25.修改订单     /order/edit     POST
            参数：
            id                     要修改账号的id    
            orderNo                订单号
            orderTime              下单时间    
            phone                  电话    
            consignee              收货人    
            deliverAddress         送货地址    
            deliveryTime           送达时间    
            remarks                备注    
            orderAmount            订单金额    
            orderState             订单状态    order/edit
*/
export const API_ORDER_EDIT=(neworder)=>axios.post('/order/edit',neworder)

/* 
        26,26.获取店铺详情
            /shop/info  get
*/
export const API_SHOP_INFO=()=>axios.get('/shop/info',{params:{}}) 

/* 
        27,27.店铺图片上传接口      /shop/upload        post
*/
export const API_SHOP_UPLOAD=()=>axios.post('/shop/upload',{})
/* 
        28,28.店铺内容修改      /shop/edit      post
                参数：
                    id                       店铺id 
                    name                     店铺名称     
                    bulletin                 店铺公告     
                    avatar                   店铺头像     
                    deliveryPrice            起送价格     
                    deliveryTime             送达时间     
                    description              店铺描述     
                    score                    店铺好评率     
                    sellCount                店铺销量         
                    supports                 活动支持         
                    date                     营业时间         
                    pics                     图片         
*/
export const API_SHOP_EDIT=(newObj)=>axios.post('/shop/edit',newObj) 


/* 
    29，    首页报表接口：/order/totaldata      get     已完成
*/
export const API_ORDER_TOTSLDATA=()=>axios.get('/order/totaldata',{ params:{}} )

/* 
            30.订单报表接口             /order/ordertotal           GET
            参数：
                    date                    字符串格式数组
                    data                   所有订单数据
                    orderTime              下单时间
                    orderAmount            订单金额
*/
export const API_ORDER_ORDERTAOTAL=(date,data,orderTime,orderAmount)=>axios.get('/order/ordertotal',{params:{ date,data,orderTime,orderAmount }}) 