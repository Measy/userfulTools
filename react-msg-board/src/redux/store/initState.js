/**
 * 本文件的作用就是直观呈现 整个应用状态树 及其 初始值
 */
export default {
    /* 用户 session */
    userData: null,

    registerData: true, // 注册名是否不存在。默认不存在，验证存在则为true

    /* 留言板模块(按需加载) */
    msg: {
        msgs: [], // 当前显示的留言列表
        displayControl: { // 查询条件
            pageIdx: 1, // 默认是第1页
            quantity: 10, // 默认每页显示10条记录
            authorSpecified: '' // 是否指定发布者
        }
    },

    /* 代办事项模块（按需加载） */
    todos: [
        {
            id: 123,
            content: '代办事项1',
            completed: false,
            createAt: 1473499991348
        }
    ]
}
