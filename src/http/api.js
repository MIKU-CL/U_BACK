import { get, post } from "./http"
// export const reqlogin = (params) => post("/login", params,true)
// export const reqlist = (params) => get("/list", params)

/*******菜单管理***********/
//菜单列表
export const reqmenulist = params => get("/api/menulist", params);
// 菜单添加
export const reqmenuadd = params => post("/api/menuadd", params);
//菜单详情
export const reqmenuinfo = params => get("/api/menuinfo", params);
// 菜单修改
export const reqmenuedit = params => post("/api/menuedit", params);
// 菜单删除
export const reqmenudelete = params => post("/api/menudelete", params);

/*******角色管理***********/
//角色列表
export const reqrolelist = () => get("/api/rolelist");
// 角色添加
export const reqroleadd = params => post("/api/roleadd", params);
//角色详情
export const reqroleinfo = params => get("/api/roleinfo", params);
// 角色修改
export const reqroleedit = params => post("/api/roleedit", params);
// 角色删除
export const reqroledelete = params => post("/api/roledelete", params);

/*******管理员管理***********/
//管理员列表
export const requserlist = params => get("/api/userlist", params);
// 管理员添加
export const requseradd = params => post("/api/useradd", params);
//管理员详情
export const requserinfo = params => get("/api/userinfo", params);
// 管理员修改
export const requseredit = params => post("/api/useredit", params);
// 管理员删除
export const requserdelete = params => post("/api/userdelete", params);
//管理员总数
export const requsercount = () => get("/api/usercount");
//管理员登录
export const requserlogin = params => post("/api/userlogin", params);


/*******商品分类管理***********/
//商品分类列表
export const reqcatelist = params => get("/api/catelist", params);
// 商品分类添加
export const reqcateadd = params => post("/api/cateadd", params, true);
//商品分类详情
export const reqcateinfo = params => get("/api/cateinfo", params);
// 商品分类修改
export const reqcateedit = params => post("/api/cateedit", params, true);
// 商品分类删除
export const reqcatedelete = params => post("/api/catedelete", params);

/*******规格管理***********/
//规格列表
export const reqspecslist = (params) => get("/api/specslist", params);
// 规格添加
export const reqspecsadd = params => post("/api/specsadd", params);
//规格详情
export const reqspecsinfo = params => get("/api/specsinfo", params);
// 规格修改
export const reqspecsedit = params => post("/api/specsedit", params);
// 规格删除
export const reqspecsdelete = params => post("/api/specsdelete", params);
// 规格总数
export const reqspecscount = () => get("/api/specscount")

/*******商品管理***********/
//商品列表
export const reqgoodslist = (params) => get("/api/goodslist", params);
// 商品添加
export const reqgoodsadd = params => post("/api/goodsadd", params,true);
//商品详情
export const reqgoodsinfo = params => get("/api/goodsinfo", params);
// 商品修改
export const reqgoodsedit = params => post("/api/goodsedit", params,true);
// 商品删除
export const reqgoodsdelete = params => post("/api/goodsdelete", params);
// 商品总数
export const reqgoodscount = () => get("/api/goodscount")



/*******轮播图管理***********/
//轮播图列表
export const reqbannerlist = () => get("/api/bannerlist");
// 轮播图添加
export const reqbanneradd = params => post("/api/banneradd", params, true);
//轮播图详情
export const reqbannerinfo = params => get("/api/bannerinfo", params);
// 轮播图修改
export const reqbanneredit = params => post("/api/banneredit", params, true);
// 轮播图删除
export const reqbannerdelete = params => post("/api/bannerdelete", params);


/*******会员管理***********/
//会员列表
export const reqmemberlist = () => get("/api/memberlist");
//会员详情
export const reqmemberinfo = params => get("/api/memberinfo", params);
// 会员修改
export const reqmemberedit = params => post("/api/memberedit", params);