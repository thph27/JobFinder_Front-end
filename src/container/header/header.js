import React from 'react'
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import './header.scss';

const Header = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        // if (userData && userData.roleCode !== 'CANDIDATE')
        // {
        //     toast.error("Vai trò của bạn không làm việc ở đây")
        //     setTimeout(() => {
        //         window.location.href = "/admin"
        //     }, 1000);
        // }
        setUser(userData)
    }, [])
    let handleLogout = () => {
        console.log("hello")
        localStorage.removeItem("userData");
        localStorage.removeItem("token_user")
        window.location.href = "/login"
    }

    let scrollHeader = () => {
        window.addEventListener("scroll", function () {
            var header = document.querySelector(".header-area");
            if (header) {
                header.classList.toggle("sticky", window.scrollY > 0)
            }
        })
    }
    scrollHeader()

    return (
        <>
            <header>
                {/* <!-- Header Start --> */}
                <div className="header-area header-transparrent">
                    <div className="headder-top header-sticky">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-2 col-md-2" style={{paddingLeft: '40px'}}>
                                    {/* <!-- Logo --> */}
                                    <div className="logo" style={{ zIndex: 1, width: '120px', height: 'auto'}}>
                                        <NavLink to="/">
                                            <img 
                                                src="/assets/img/logo/logoNew.png" 
                                                alt="" 
                                                style={{width: '120px', height: 'auto'}}
                                            />
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-10 col-md-10" style={{paddingLeft: 0, paddingRight: 0}}>
                                    <div className="menu-wrapper">
                                        {/* <!-- Main-menu --> */}
                                        <div className="main-menu" style={{marginLeft: '40px'}}>
                                            <nav className="d-none d-lg-block">
                                                <ul id="navigation">
                                                    <li><NavLink style={{ fontSize: '21px', fontWeight: 'bold'}} to="/" isActive={() => window.scrollTo(0, 0)}>Trang chủ</NavLink></li>
                                                    <li><NavLink style={{ fontSize: '21px', fontWeight: 'bold'}} to="/job" isActive={() => window.scrollTo(0, 0)}>Việc làm</NavLink></li>
                                                    <li><NavLink style={{ fontSize: '21px', fontWeight: 'bold'}} to="/company" isActive={() => window.scrollTo(0, 0)}>Công ty</NavLink></li>
                                                    <li><NavLink style={{ fontSize: '21px', fontWeight: 'bold'}} to="/about" isActive={() => window.scrollTo(0, 0)}>Giới thiệu</NavLink></li>
                                                </ul>
                                            </nav>
                                        </div>
                                        {/* <!-- Header-btn --> */}
                                        <div className="header-btn d-none f-right d-lg-block">
                                            {user ?
                                                <ul className="navbar-nav navbar-nav-right">
                                                    <li className="nav-item nav-profile dropdown">
                                                        <a className="nav-link dropdown-toggle box-header-profile" href="#" data-toggle="dropdown" id="profileDropdown" style={{paddingLeft: '0', paddingRight: '5px'}}>
                                                            <img style={{ objectFit: 'cover', width: '30px', height: '30px', borderRadius: '50%', marginLeft: '15px' }} src={user.image} alt="profile" />
                                                            <span className='header-name-user'>{user.firstName + " " + user.lastName}</span>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                                            <Link to='/candidate/info' className="dropdown-item">
                                                                <i className="far fa-user text-primary" />
                                                                Thông tin
                                                            </Link>
                                                            <Link to='/candidate/usersetting' className="dropdown-item">
                                                                <i className="far fa-solid fa-bars text-primary" />
                                                                Cài đặt nâng cao
                                                            </Link>
                                                            <Link to="/candidate/cv-post/" className="dropdown-item">
                                                                <i className="far fa-file-word text-primary"></i>
                                                                Công việc đã nộp
                                                            </Link>
                                                            <Link to='/candidate/changepassword/' className="dropdown-item">
                                                                <i className="ti-settings text-primary" />
                                                                Đổi mật khẩu
                                                            </Link>
                                                            <a onClick={() => handleLogout()} className="dropdown-item">
                                                                <i className="ti-power-off text-primary" />
                                                                Đăng xuất
                                                            </a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                :
                                                <>
    <Link 
      to={'/register'} 
      className="btn1 btn1-primary1 btn1-lg"
      style={{
        marginRight: '10px',
        width: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase'
      }}
    >
      Đăng ký
    </Link>
    <Link 
      to={'/login'}
      className="btn1 btn1-primary1 btn1-lg"
      style={{
        width: 'auto',
        display: 'inline-flex', 
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase'
      }}
    >
                                                    Đăng nhập  
                                                </Link>
                                            </>
                                            }


                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Mobile Menu --> */}
                                <div className="col-12">
                                    <div className="mobile_menu d-block d-lg-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Header End --> */}
            </header >

        </>
    )
}

export default Header
