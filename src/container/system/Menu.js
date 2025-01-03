import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
const Menu = () => {


    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item relative">
                    <Link className="nav-link" to="/admin/">
                        <i className="icon-grid menu-icon" />
                        <span className="menu-title">Trang chủ</span>
                    </Link>
                </li>
                {user && user.roleCode === "ADMIN" &&
                    <>
                       <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#chart" aria-expanded="false" aria-controls="chart">
                                <i className="fas fa-chart-line menu-icon" />
                                <span className="menu-title">Thống kê</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="chart">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/sum-by-year-post/"> Doanh thu gói bài viết </Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/sum-by-year-cv/"> Doanh thu gói xem ứng viên </Link ></li>                                
                                </ul>   
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                                <i className="fas fa-user menu-icon" />
                                <span className="menu-title">Người dùng</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="auth">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-user/"> Danh sách người dùng </Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-user/"> Thêm người dùng </Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#jobtype" aria-expanded="false" aria-controls="jobtype">
                                <i className="fas fa-industry menu-icon"></i>
                                <span className="menu-title">Lĩnh vực</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="jobtype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-job-type/">Danh sách ngành nghề</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-job-type/">Thêm ngành nghề</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#jobskill" aria-expanded="false" aria-controls="jobskill">
                                <i className="fas fa-briefcase menu-icon"></i>
                                <span className="menu-title">Chuyên môn</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="jobskill">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-job-skill/">Danh sách các chuyên môn</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-job-skill/">Thêm chuyên môn</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#joblevel" aria-expanded="false" aria-controls="joblevel">
                                <i className="fas fa-level-up-alt menu-icon"></i>
                                <span className="menu-title">Vị trí</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="joblevel">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-job-level/">Danh sách vị trí</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-job-level/">Thêm vị trí</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#worktype" aria-expanded="false" aria-controls="worktype">
                                <i className="fas fa-building menu-icon"></i>
                                <span className="menu-title">Hình thức làm việc</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="worktype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-work-type/">Danh sách hình thức</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-work-type/">Thêm hình thức</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#salarytype" aria-expanded="false" aria-controls="salarytype">
                                <i className="fas fa-money-check-alt menu-icon"></i>
                                <span className="menu-title">Mức lương</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="salarytype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-salary-type/">Danh sách mức lương</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-salary-type/">Thêm mức lương</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#exptype" aria-expanded="false" aria-controls="exptype">
                                <i className="fas fa-clock menu-icon"></i>
                                <span className="menu-title">Kinh nghiệm</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="exptype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-exp-type/">Danh sách kinh nghiệm</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-exp-type/">Thêm kinh nghiệm</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#packagepost" aria-expanded="false" aria-controls="packagepost">
                                <i className="fas fa-cube menu-icon"></i>
                                <span className="menu-title">Gói bài đăng</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="packagepost">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-package-post/">Các gói bài đăng</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-package-post/">Thêm gói bài đăng</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#packagecv" aria-expanded="false" aria-controls="packagecv">
                                <i className="fas fa-cube menu-icon"></i>
                                <span className="menu-title">Gói xem ứng viên</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="packagecv">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-package-cv/">Các gói xem ứng viên</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-package-cv/">Thêm gói xem ứng viên</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#company" aria-expanded="false" aria-controls="company">
                                <i className="fas fa-building menu-icon"></i>
                                <span className="menu-title">Công ty</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="company">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-company-admin/">Danh sách các công ty</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#post" aria-expanded="false" aria-controls="post">
                                <i className="fas fa-clipboard menu-icon"></i>
                                <span className="menu-title">Bài đăng</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="post">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-post-admin/">Danh sách bài đăng</Link ></li>
                                </ul>
                            </div>
                        </li>
                    </>
                }
                {user && (user.roleCode === "COMPANY") &&
                    <>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#company" aria-expanded="false" aria-controls="company">
                            <i className="fas fa-building menu-icon"></i>
                                <span className="menu-title">Quản lý công ty</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="company">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/edit-company/">Quản lý công ty</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/recruitment/">Tuyển dụng vào công ty</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-employer/">Danh sách nhân viên</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-user/">Thêm nhân viên</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#post" aria-expanded="false" aria-controls="post">
                            <i class="fa-solid fa-clipboard menu-icon"></i>
                                <span className="menu-title">Quản lý bài đăng</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="post">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-post/">Tạo mới bài đăng</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-post/">Danh sách bài đăng</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/buy-post/">Mua thêm lượt đăng bài</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#findCandiate" aria-expanded="false" aria-controls="findCandiate">
                                <i className="icon-head menu-icon"></i>
                                <span className="menu-title">Tìm kiếm ứng viên</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="findCandiate">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/buy-cv/">Mua thêm lượt xem ứng viên</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-candiate/">Danh sách ứng viên</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#historyTrade" aria-expanded="false" aria-controls="historyTrade">
                                <i className="fas fa-money-check-alt menu-icon"></i>
                                <span className="menu-title">Lịch sử giao dịch</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="historyTrade">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/history-post/">Lịch sử gói bài đăng</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/history-cv/">Lịch sử gói xem ứng viên</Link ></li>
                                </ul>
                            </div>
                        </li>
                    </>
                }

                {user && (user.roleCode === "EMPLOYER") &&
                    <>
                        {
                            !user.companyId &&
                            <li className="nav-item relative">
                                <a className="nav-link" data-toggle="collapse" href="#company" aria-expanded="false" aria-controls="company">
                                    <i className="far fa-clock menu-icon"></i>
                                    <span className="menu-title">Công ty</span>
                                    <i className="menu-arrow" />
                                </a>
                                <div className="collapse" id="company">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-company/">Tạo mới công ty</Link ></li>
                                    </ul>
                                </div>
                            </li>
                        }
                        {
                            user.companyId && 
                        <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#post" aria-expanded="false" aria-controls="post">
                                <i className="far fa-clock menu-icon"></i>
                                <span className="menu-title">Quản lý bài đăng</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="post">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/add-post/">Tạo mới bài đăng</Link ></li>
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-post/">Danh sách bài đăng</Link ></li>
                                </ul>
                            </div>
                        </li>
                        }
                        {
                            user.companyId && 
                            <li className="nav-item relative">
                            <a className="nav-link" data-toggle="collapse" href="#post" aria-expanded="false" aria-controls="post">
                            <i class="icon-head menu-icon"></i>
                                <span className="menu-title">Tìm kiếm ứng viên</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="post">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item relative"> <Link className="nav-link" to="/admin/list-candiate/">Danh sách ứng viên</Link ></li>
                                </ul>
                            </div>
                        </li>
                        }
                    </>
                }

            </ul>
        </nav>

    )
}

export default Menu
