import React, { Component, PropTypes } from 'react'
import msgService from 'SERVICE/msgService'
import handleChange from 'MIXIN/handleChange'
import tpl from './msg-form.jsx' // 分拆写JSX模板减少单个文件代码量

/* 为什么不直接 const initState = { ... } 而是用函数返回呢？
   皆因直接传 initState 仅是传引用，initState 本身可被修改 */
const getInitState = () => ({ id: '', title: '', content: '' })

/* 由于本组件由 /msg/add 与 /msg/:msgId 所公用
因此需要判断当前是“新增模式”还是“修改模式” */
const isAddMode = pathname => pathname.startsWith('/msg/add')

export default class MsgForm extends Component {
    static contentTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props, context) {
        // 既然用到了 context，显然需要 super 一下咯
        // 实际上最完善的形式的确就是如下写法
        super(props, context)

        // 初始state必须定义，否则会报错
        // 就像在Vue中需要再data中定义默认值
        this.state = getInitState()

        this.handleChange = handleChange.bind(this) // mixin
    }

    componentDidMount() {
        this.updateState()
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps)
    }

    /* 不传入 props 则默认使用当前 props */
    updateState({location, params: {msgId}, userData: {username}, msg: {msgs}} = this.props) {
        // 情况1：处于 /msg/add，直接就是还原初始状态
        if (isAddMode(location.pathname)) {
            return this.setState(getInitState())
        }

        // 情况2：处于 /msg/modify/:msgId，且 state 中 msgs 不为空
        if (msgs.length) {
            let nextState = msgs.filter(({id}) => id === msgId)[0]
            if (!nextState || nextState.author !== username) {
                return this.handleIllegal()
            }
            return this.setState(nextState)
        }

        // 情况3：强制刷新 /msg/detail/:msgId 后，跳转到/msg/modify/:msgId
        // 此时 state中msgs为空，需要立即从后端API获取
        msgService.fetch({ msgId }).then(msg => {
            let {id, title, content, author} = msg
            if (!msg || author !== username) {
                return this.handleIllegal()
            }
            this.setState({ id, title, content })
        })
    }

    handleIllegal() {
        // 使用setTimeout防止阻塞跳转
        setTimeout(() => alert('非法访问'))
        location.replace('/msg')

        // 为什么不使用如下代码跳转？
        // this.context.router.replace('/msg')
        // 因为会触发 componentWillReceiveProps 无限循环
    }

    /* 同样地，提交表单前需要根据当前 mode 进行对应的操作 */
    handleSubmit(evt) {
        evt.preventDefault()
        let {pathname} = this.props.location
        let opt = isAddMode(pathname) ? 'addMsg' : 'modMsg'

        // 提交后，由于会触发 componentWillReceiveProps
        // 因此这里需要把该函数“清空”，避免浪费性能
        this.updateState = () => { }

        this.props[opt](this.state).then(({id}) => {
            this.context.router.replace(`/msg/detail/${id}`)
        })
    }

    render() {
        // 使用 call/apply，让 tpl 中的上下文与当前一致
        // （最佳实践应该跟 mixin 一样，在构造函数中使用 bind 绑定）
        return tpl.call(this)
    }
}
