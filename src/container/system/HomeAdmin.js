import React from 'react'
import Header from './Header';
import Menu from './Menu';
import Home from './Home';
import Footer from './Footer';
import ManageUser from './User/ManageUser';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddUser from './User/AddUser';
import AddJobType from './JobType/AddJobType';
import ManageJobType from './JobType/ManageJobType';
import AddJobLevel from './JobLevel/AddJobLevel';
import ManageJobLevel from './JobLevel/ManageJobLevel';
import AddWorkType from './WorkType/AddWorkType';
import ManageWorkType from './WorkType/ManageWorkType';
import AddSalaryType from './SalaryType/AddSalaryType';
import ManageSalaryType from './SalaryType/ManageSalaryType';
import AddExpType from './ExpType/AddExpType';
import ManageExpType from './ExpType/ManageExpType';
import AddCompany from './Company/AddCompany';
import Recruitment from './Company/Recruitment';
import ManageEmployer from './Company/ManageEmployer';
import AddPost from './Post/AddPost';
import ManagePost from './Post/ManagePost';
import ManageCv from './Cv/ManageCv';
import FilterCv from './Cv/FilterCv';
import UserCv from './Cv/UserCv';
import ChangePassword from './User/ChangePassword';
import UserInfo from './User/UserInfo';
import BuyPost from './Post/BuyPost';
import PaymentSuccess from './Post/BuySucces';
import AddpackagePost from './PackagePost/AddPackagePost';
import ManagePackagePost from './PackagePost/ManagePackagePost';
import NotePost from './Post/NotePost';
import ManageCompany from './Company/ManageCompany';
import AddJobSkill from './JobSkill/AddJobSkill';
import ManageJobSkill from './JobSkill/ManageJobSkill';
import DetailFilterUser from './Cv/DetailFilterUser';
import AddpackageCv from './PackageCv/AddPackageCv';
import ManagePackageCv from './PackageCv/ManagePackageCv';
import PaymentSuccessCv from './PackageCv/BuySuccesCv';
import BuyCv from './PackageCv/BuyCv';
import HistoryTradePost from './HistoryTrade/HistoryTradePost';
import HistoryTradeCv from './HistoryTrade/HistoryTradeCv';
import ChartPost from './Chart/ChartPost';
import ChartCv from './Chart/ChartCv';
const HomeAdmin = () => {
    return (
        <Router>
            <div className="container-scroller">
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <div className="theme-setting-wrapper">
                        <div id="settings-trigger"><i className="ti-settings" /></div>
                        <div id="theme-settings" className="settings-panel">
                            <i className="settings-close ti-close" />
                            <p className="settings-heading">SIDEBAR SKINS</p>
                            <div className="sidebar-bg-options selected" id="sidebar-light-theme"><div className="img-ss rounded-circle bg-light border mr-3" />Light</div>
                            <div className="sidebar-bg-options" id="sidebar-dark-theme"><div className="img-ss rounded-circle bg-dark border mr-3" />Dark</div>
                            <p className="settings-heading mt-2">HEADER SKINS</p>
                            <div className="color-tiles mx-0 px-4">
                                <div className="tiles success" />
                                <div className="tiles warning" />
                                <div className="tiles danger" />
                                <div className="tiles info" />
                                <div className="tiles dark" />
                                <div className="tiles default" />
                            </div>
                        </div>
                    </div>
                    <div id="right-sidebar" className="settings-panel">
                        <i className="settings-close ti-close" />
                        <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="setting-content">
                            <div className="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
                                <div className="add-items d-flex px-3 mb-0">
                                    <form className="form w-100">
                                        <div className="form-group d-flex">
                                            <input type="text" className="form-control todo-list-input" placeholder="Add To-do" />
                                            <button type="submit" className="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="list-wrapper px-3">
                                    <ul className="d-flex flex-column-reverse todo-list">
                                        <li>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" />
                                                    Team review meeting at 3.00 PM
                                                </label>
                                            </div>
                                            <i className="remove ti-close" />
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" />
                                                    Prepare for presentation
                                                </label>
                                            </div>
                                            <i className="remove ti-close" />
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" />
                                                    Resolve all the low priority tickets due today
                                                </label>
                                            </div>
                                            <i className="remove ti-close" />
                                        </li>
                                        <li className="completed">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" defaultChecked />
                                                    Schedule meeting for next week
                                                </label>
                                            </div>
                                            <i className="remove ti-close" />
                                        </li>
                                        <li className="completed">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" defaultChecked />
                                                    Project review
                                                </label>
                                            </div>
                                            <i className="remove ti-close" />
                                        </li>
                                    </ul>
                                </div>
                                <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">Events</h4>
                                <div className="events pt-4 px-3">
                                    <div className="wrapper d-flex mb-2">
                                        <i className="ti-control-record text-primary mr-2" />
                                        <span>Feb 11 2018</span>
                                    </div>
                                    <p className="mb-0 font-weight-thin text-gray">Creating component page build a js</p>
                                    <p className="text-gray mb-0">The total number of sessions</p>
                                </div>
                                <div className="events pt-4 px-3">
                                    <div className="wrapper d-flex mb-2">
                                        <i className="ti-control-record text-primary mr-2" />
                                        <span>Feb 7 2018</span>
                                    </div>
                                    <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
                                    <p className="text-gray mb-0 ">Call Sarah Graves</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                                <div className="d-flex align-items-center justify-content-between border-bottom">
                                    <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Friends</p>
                                    <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">See All</small>
                                </div>
                                <ul className="chat-list">
                                    <li className="list active">
                                        <div className="profile"><img src="assetsAdmin/images/faces/face1.jpg" alt="image" /><span className="online" /></div>
                                        <div className="info">
                                            <p>Thomas Douglas</p>
                                            <p>Available</p>
                                        </div>
                                        <small className="text-muted my-auto">19 min</small>
                                    </li>
                                    <li className="list">
                                        <div className="profile"><img src="assetsAdmin/images/faces/face2.jpg" alt="image" /><span className="offline" /></div>
                                        <div className="info">
                                            <div className="wrapper d-flex">
                                                <p>Catherine</p>
                                            </div>
                                            <p>Away</p>
                                        </div>
                                        <div className="badge badge-success badge-pill my-auto mx-2">4</div>
                                        <small className="text-muted my-auto">23 min</small>
                                    </li>
                                    <li className="list">
                                        <div className="profile"><img src="assetsAdmin/images/faces/face3.jpg" alt="image" /><span className="online" /></div>
                                        <div className="info">
                                            <p>Daniel Russell</p>
                                            <p>Available</p>
                                        </div>
                                        <small className="text-muted my-auto">14 min</small>
                                    </li>
                                    <li className="list">
                                        <div className="profile"><img src="assetsAdmin/images/faces/face4.jpg" alt="image" /><span className="offline" /></div>
                                        <div className="info">
                                            <p>James Richardson</p>
                                            <p>Away</p>
                                        </div>
                                        <small className="text-muted my-auto">2 min</small>
                                    </li>
                                    <li className="list">
                                        <div className="profile"><img src="assetsAdmin/images/faces/face5.jpg" alt="image" /><span className="online" /></div>
                                        <div className="info">
                                            <p>Madeline Kennedy</p>
                                            <p>Available</p>
                                        </div>
                                        <small className="text-muted my-auto">5 min</small>
                                    </li>
                                    <li className="list">
                                        <div className="profile"><img src="assetsAdmin/images/faces/face6.jpg" alt="image" /><span className="online" /></div>
                                        <div className="info">
                                            <p>Sarah Graves</p>
                                            <p>Available</p>
                                        </div>
                                        <small className="text-muted my-auto">47 min</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Menu />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Switch>
                                <Route exact path="/admin/" component={Home} />
                                <Route exact path="/admin/list-user" component={ManageUser} />
                                <Route exact path="/admin/add-user" component={AddUser} />
                                <Route exact path="/admin/edit-user/:id" component={AddUser} />
                                <Route exact path="/admin/add-job-type" component={AddJobType} />
                                <Route exact path="/admin/list-job-type" component={ManageJobType} />
                                <Route exact path="/admin/edit-job-type/:code" component={AddJobType} />
                                <Route exact path="/admin/add-job-skill" component={AddJobSkill} />
                                <Route exact path="/admin/list-job-skill" component={ManageJobSkill} />
                                <Route exact path="/admin/edit-job-skill/:code" component={AddJobSkill} />
                                <Route exact path="/admin/add-job-level" component={AddJobLevel} />
                                <Route exact path="/admin/list-job-level" component={ManageJobLevel} />
                                <Route exact path="/admin/edit-job-level/:id" component={AddJobLevel} />
                                <Route exact path="/admin/add-work-type" component={AddWorkType} />
                                <Route exact path="/admin/list-work-type" component={ManageWorkType} />
                                <Route exact path="/admin/edit-work-type/:id" component={AddWorkType} />
                                <Route exact path="/admin/add-salary-type" component={AddSalaryType} />
                                <Route exact path="/admin/list-salary-type" component={ManageSalaryType} />
                                <Route exact path="/admin/edit-salary-type/:id" component={AddSalaryType} />
                                <Route exact path="/admin/add-exp-type" component={AddExpType} />
                                <Route exact path="/admin/list-exp-type" component={ManageExpType} />
                                <Route exact path="/admin/edit-exp-type/:id" component={AddExpType} />
                                <Route exact path="/admin/add-package-post" component={AddpackagePost} />
                                <Route exact path="/admin/list-package-post" component={ManagePackagePost} />
                                <Route exact path="/admin/edit-package-post/:id" component={AddpackagePost} />
                                <Route exact path="/admin/add-package-cv" component={AddpackageCv} />
                                <Route exact path="/admin/list-package-cv" component={ManagePackageCv} />
                                <Route exact path="/admin/edit-package-cv/:id" component={AddpackageCv} />
                                <Route exact path="/admin/add-company" component={AddCompany} />
                                <Route exact path="/admin/edit-company" component={AddCompany} />
                                <Route exact path="/admin/edit-company-admin/:id" component={AddCompany} />
                                <Route exact path="/admin/recruitment" component={Recruitment} />
                                <Route exact path="/admin/list-employer" component={ManageEmployer} />
                                <Route exact path="/admin/add-post" component={AddPost} />
                                <Route exact path="/admin/edit-post/:id" component={AddPost} />
                                <Route exact path="/admin/list-post/" component={ManagePost} />
                                <Route exact path="/admin/list-post/:id" component={ManagePost} />
                                <Route exact path="/admin/buy-post/" component={BuyPost} />
                                <Route exact path="/admin/payment/success" component={PaymentSuccess} />
                                <Route exact path="/admin/buy-cv/" component={BuyCv} />
                                <Route exact path="/admin/paymentCv/success" component={PaymentSuccessCv} />
                                <Route exact path="/admin/list-post-admin/" component={ManagePost} />
                                <Route exact path="/admin/list-cv/:id" component={ManageCv} />
                                <Route exact path="/admin/list-candiate/" component={FilterCv} />
                                <Route exact path="/admin/candiate/:id" component={DetailFilterUser} />
                                <Route exact path="/admin/note/:id" component={NotePost} />
                                <Route exact path="/admin/user-cv/:id" component={UserCv} />
                                <Route exact path="/admin/changepassword/" component={ChangePassword} />
                                <Route exact path="/admin/user-info/" component={UserInfo} />
                                <Route exact path="/admin/list-company-admin/" component={ManageCompany} />
                                <Route exact path="/admin/history-post/" component={HistoryTradePost} />
                                <Route exact path="/admin/history-cv/" component={HistoryTradeCv} />
                                <Route exact path="/admin/sum-by-year-post/" component={ChartPost} />
                                <Route exact path="/admin/sum-by-year-cv/" component={ChartCv} />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default HomeAdmin
