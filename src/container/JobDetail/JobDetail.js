import React from 'react'
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SendCvModal from '../../components/modal/SendCvModal'
import { getDetailPostByIdService, getAllListCvByUserIdService } from '../../service/userService'
import moment from 'moment';
import CommonUtils from '../../util/CommonUtils';
import './JobDetail.css'
const JobDetail = () => {
    const history = useHistory()
    const { id } = useParams()
    const [isActiveModal, setAcitveModal] = useState(false)
    const [dataPost, setDataPost] = useState({});
    const [isApplied, setIsApplied] = useState(false)

    useEffect(() => {
        if (id) {
            fetchPost(id)
            checkUserApplied()
        }
    }, [])

    let fetchPost = async (id) => {
        let res = await getDetailPostByIdService(id)
        if (res && res.errCode === 0) {
            setDataPost(res.data)
        }
    }

    const checkUserApplied = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            let res = await getAllListCvByUserIdService({
                limit: 1000,
                offset: 0,
                userId: userData.id
            })
            if (res && res.errCode === 0) {
                const isExisted = res.data.some(cv => cv.postCvData.id === Number(id));
                setIsApplied(isExisted);
            }
        }
    }

    const handleOpenModal = () => {
        if (isApplied) {
            toast.error("Bạn đã ứng tuyển công việc này rồi!")
            return
        }

        if (dataPost.timeEnd && CommonUtils.formatDate(dataPost.timeEnd) > 0) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData)
                setAcitveModal(true)
            else
            {
                toast.error("Xin hãy đăng nhập để có thể thực hiện nộp CV")
                setTimeout(()=>{
                    localStorage.setItem("lastUrl",window.location.href)
                    history.push("/login")
                },1000)
            }

        }
        else
            toast.error("Hạn ứng tuyển đã hết")
    }

    const handleSubmitSuccess = () => {
        setIsApplied(true);
    }

    const handleBack = () => {
        history.push('/job');
    }

    return (
        <>
            {/* <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
                <div className="preloader-circle"></div>
                <div className="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- Preloader Start --> */}
            {dataPost.companyData &&
                <main className="job-detail-wrapper">
                    <div className="slider-area ">
                        <div className='container'>
                        </div>
                    </div>
                    <div className="job-post-company pt-30 pb-120" style={{backgroundColor: 'rgba(189, 189, 189, .2)'}}>
                        <div className="container" style={{backgroundColor: '#fff'}}>
                        <div className="btn1 btn1-primary1 btn1-icon-text" style={{marginBottom:'30px'}} onClick={() => history.goBack()}>
                            <i className="fa-solid fa-arrow-left" style={{marginRight:'10px'}}></i>
                            Quay lại
                        </div>
                            <div className="row justify-content-between">

                                <div className="col-xl-7 col-lg-8" style={{padding: '20px'}}>

                                    <div className="single-job-items mb-30">
                                        <div className="job-items">
                                            <div className="company-img company-img-details">
                                                <img src={dataPost.companyData.thumbnail} alt="Ảnh bị lỗi" width={100} height={100} />
                                            </div>
                                            <div className="job-tittle">
                                                <h4 style={{color: '#00b14f'}}>{dataPost.postDetailData.name}</h4>
                                                <ul>
                                                    <li>{dataPost.postDetailData.workTypePostData.value}</li>
                                                    <li><i className="fas fa-map-marker-alt"></i>{dataPost.postDetailData.provincePostData.value}</li>
                                                    <li>{dataPost.postDetailData.salaryTypePostData.value}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="job-post-details">
                                        <div className="post-details1 mb-50">

                                            <div className="small-section-tittle">
                                                <h4 style={{borderLeft: '5px solid #00b14f', paddingLeft: '8px'}}>Chi tiết tuyển dụng</h4>
                                            </div>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: dataPost.postDetailData.descriptionHTML }} />
                                    </div>

                                </div>

                                <div className="col-xl-4 col-lg-4" style={{padding: '20px'}}>

                                    <div className="post-details3  mb-50">

                                        <div className="small-section-tittle">
                                            <h4 style={{borderLeft: '5px solid #00b14f', paddingLeft: '8px'}}>Thông tin công việc</h4>
                                        </div>
                                        <ul>
                                            <li>Lĩnh vực : <span>{dataPost.postDetailData.jobTypePostData.value}</span></li>
                                            <li>Nơi làm việc : <span>{dataPost.postDetailData.provincePostData.value}</span></li>
                                            <li>Hình thức làm việc : <span>{dataPost.postDetailData.workTypePostData.value}</span></li>
                                            <li>Kinh nghiệm:  <span>{dataPost.postDetailData.expTypePostData.value}</span></li>
                                            <li>Lương :  <span>{dataPost.postDetailData.salaryTypePostData.value}</span></li>
                                            <li>Hạn nộp : <span>{moment.unix(dataPost.timeEnd / 1000).format('DD/MM/YYYY')}</span></li>
                                        </ul>
                                        <div className="btn1 btn1-primary1 btn1-icon-text" style={{width:'100%', height:'50px', alignItems:'center', justifyContent:'center'}} onClick={() => handleOpenModal()}> <div style={{fontSize:'18px', paddingTop:'5px'}}>Ứng tuyển ngay</div></div>
                                    </div>
                                    <div className="post-details4  mb-50">

                                        <div className="small-section-tittle">
                                            <h4>Thông tin công ty</h4>
                                        </div>
                                        <span style={{fontSize: '18px', fontWeight: '500', color: '#00b14f'}}>{dataPost.companyData.name}</span>
                                        <ul>
                                            <li>Website     : <span>{dataPost.companyData.website}</span></li>
                                            <li>Địa chỉ     : <span>{dataPost.companyData.address}</span></li>
                                            <li>Điện thoại  : <span>{dataPost.companyData.phonenumber}</span></li>
                                            <li>Mã số thuế  : <span>{dataPost.companyData.taxnumber}</span></li>
                                            <li>Số nhân viên: <span>{dataPost.companyData.amountEmployer}</span></li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- job post company End --> */}
                    <SendCvModal 
                        isOpen={isActiveModal} 
                        onHide={() => setAcitveModal(false)} 
                        postId={dataPost.id}
                        onSubmitSuccess={handleSubmitSuccess}
                    />
                </main>
            }
        </>
    )
}

export default JobDetail
