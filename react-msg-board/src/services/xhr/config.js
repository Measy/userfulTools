//此处配置 跟访问路径 以及 全局错误处理
//更多配置根据业务逻辑自行实现

//后台API地址，最好以 http(s):// 打头
export const rootPath = 'http://localhost:8989'

export const errHandler = (e) => {
    alert('[XHR:Failed] 详情请看控制台');
    console.error(e);
}