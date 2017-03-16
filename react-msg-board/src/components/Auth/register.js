import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'
import 'ASSET/css/loginForm.css'

export default class ResisterForm extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', rePassword: '', email: '' }
        this.handleChange = handleChange.bind(this)

        // 判断是否已经登录，未登录情况下才可以注册
        let {userData} = this.props
        if (userData) this.context.router.goBack()
    }

    componentWillReceiveProps(nextProps) {
        // 判断是否存在登入cookie，存在则跳转到原来的界面
        let {userData} = nextProps
        if (userData) this.context.router.goBack()
    }

    handleSubmit() {
        let userData = this.state
        this.props.register(userData)
    }

    checkUsername() {
        let username = this.state.username
        this.props.checkUsername(username)
    }

    render() {
        let {registerData} = this.props

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
                        id="register_form">
                        <h3 className="form-title">Login to your account</h3>
                        <div className="col-sm-9 col-md-9">
                            <div className="form-group">
                                <i className="fa fa-user fa-lg"></i>
                                <input
                                    className={'form-control required ' + (!registerData ? 'warnning' : '')}
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    autofocus="autofocus"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    onBlur={(e) => { this.checkUsername() } } />
                                {!registerData ?
                                    <span>用户名被占用</span> : ''
                                }
                            </div>
                            <div className="form-group">
                                <i className="fa fa-lock fa-lg"></i>
                                <input
                                    className="form-control required"
                                    type="password"
                                    placeholder="Password"
                                    id="register_password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-check fa-lg"></i>
                                <input
                                    className="form-control required"
                                    type="password"
                                    placeholder="Re-type Your Password"
                                    name="rpassword"
                                    value={this.state.rePassword}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-envelope fa-lg"></i>
                                <input
                                    className="form-control eamil"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btn btn-success pull-right"
                                    value="Sign Up " />
                                <input
                                    type="button"
                                    className="btn btn-info pull-left"
                                    id="back_btn"
                                    value="Back" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
