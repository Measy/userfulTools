import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'

export default class LoginForm extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        // P.S: 仅能在构造函数中设置 state
        // 在其他地方绝不能使用 this.state.XXX = XXX
        // 只能使用 this.setState({ XXX: XXX })
        this.state = { username: '' }
        this.handleChange = handleChange.bind(this) // mixin
    }

    handleSubmit() {
        this.context.router.push('/login')
    }

    render() {
        /* 由于 ES6 中 React 不会自动绑定this，直接 onSubmit={this.handleSubmit} 会报错
    所以才用箭头函数指定this,详情请参考 https://facebook.github.io/react/docs/handling-events.html*/
        return (
            <form
                role="search"
                className="navbar-form navbar-right"
                onSubmit={
                    (e) => {
                        e.preventDefault() // 防止页面跳转
                        this.handleSubmit()
                    }
                }>

                <button
                    type="submit"
                    className="btn btn-success">
                    登入
                </button>
            </form>
        )
    }
}
