import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'
import 'ASSET/css/loginForm.css'

export default class LoginForm extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', remember: false }
        this.handleChange = handleChange.bind(this)

        // 判断是否存在未过期的登入cookie，存在则有userData不重复登入
        console.log('auth constructor')
        console.log(this.props)
        let {userData} = this.props
        if (userData) this.context.router.goBack()
    }

    componentWillReceiveProps(nextProps) {
        // 判断是否存在未过期的登入cookie，存在则有userData不重复登入
        console.log('componentWillReceiveProps')
        let {userData} = nextProps
        if (userData) this.context.router.goBack()
    }

    handleSubmit() {
        let userData = this.state
        this.props.login(userData)
    }

    // 基础知识：  
    // 网格系统:通过行和列布局  
    // 行必须放在container内  
    // 手机用col-xs-*  
    // 平板用col-sm-*  
    // 笔记本或普通台式电脑用col-md-*  
    // 大型设备台式电脑用col-lg-*  
    // 为了兼容多个设备，可以用多个col-*-*来控制；  
    render() {
        return (
            <div className="container">

                <div className="form row">
                    <form
                        onSubmit={
                            (e) => {
                                e.preventDefault()
                                this.handleSubmit(e)
                            }
                        }
                        className="form-horizontal col-sm-offset-3 col-md-offset-3"
                        id="login_form">
                        <h3 className="form-title">Login to your account</h3>
                        <div className="col-sm-9 col-md-9">
                            <div className="form-group">
                                <i className="fa fa-user fa-lg"></i>
                                <input
                                    className="form-control required"
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    autofocus="autofocus"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                    maxlength="20" />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-lock fa-lg"></i>
                                <input
                                    className="form-control required"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    maxlength="8" />
                            </div>
                            <div className="form-group">
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        value={this.state.remember}
                                        onChange={this.handleChange} />
                                    Remember me
                                </label>
                                <hr />
                                <a href="javascript:;" id="register_btn" className="">Create an account</a>
                            </div>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btn btn-success pull-right"
                                    value="Login " />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="form row">
                    <form className="form-horizontal col-sm-offset-3 col-md-offset-3" id="register_form">
                        <h3 className="form-title">Login to your account</h3>
                        <div className="col-sm-9 col-md-9">
                            <div className="form-group">
                                <i className="fa fa-user fa-lg"></i>
                                <input className="form-control required" type="text" placeholder="Username" name="username" autofocus="autofocus" />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-lock fa-lg"></i>
                                <input className="form-control required" type="password" placeholder="Password" id="register_password" name="password" />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-check fa-lg"></i>
                                <input className="form-control required" type="password" placeholder="Re-type Your Password" name="rpassword" />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-envelope fa-lg"></i>
                                <input className="form-control eamil" type="text" placeholder="Email" name="email" />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-success pull-right" value="Sign Up " />
                                <input type="submit" className="btn btn-info pull-left" id="back_btn" value="Back" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
