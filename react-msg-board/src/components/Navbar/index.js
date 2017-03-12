import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import LoginForm from './LoginForm'
import LogoutDropdown from './LogoutDropdown'

/* 导航栏全局显示，控制用户的登入注销 */
@connect(
    ({userData}) => ({ userData }),
    require('ACTION/user').default
)
export default class Navbar extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentWillMount() {
        console.info('[Navbar]初始化: 检查用户是否已经登入')
        console.info('[TIPS]由于有Redux Logger, 故之后不手动打印动作了')
        this.props.checkLogin()
    }

    render() {
        let {
            userData, login, logout, // 通过connect获取
            location: {pathname} // 通过App传入
        } = this.props

        return (
            <div className="row clearfix">
                <div className="col-md-12 colum">
                    <nav className="navbar navbar-default" role="navigation">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle"
                                data-toggle="collapse"
                                data-target="#nav-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand">
                                React Demo
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse" id="nav-collapse">
                            <ul className="nav navbar-nav">
                                <li className={pathname === '/' && 'active'}>
                                    <IndexLink to='/'>
                                        欢迎页
                                    </IndexLink>
                                </li>
                                <li className={pathname.startsWith('/msg') && 'active'}>
                                    <Link to='/msg'>
                                        留言板
                                    </Link>
                                </li>
                                <li className={pathname.startsWith('/todo') && 'active'}>
                                    <Link to='/todo'>
                                        待办事项(新功能)
                                    </Link>
                                </li>
                            </ul>
                            {userData ?
                                <LogoutDropdown userData={userData} logout={logout} /> :
                                <LoginForm login={login} />
                            }
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
