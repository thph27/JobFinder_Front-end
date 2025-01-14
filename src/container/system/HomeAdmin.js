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
