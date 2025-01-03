import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Categories from '../../components/home/Categories'
import FeatureJobs from '../../components/home/FeaturesJobs'
import { getListPostService } from '../../service/userService'
import '../../styles/home.css'
import Chatbot from './ChatHomePage'
const Home = () => {
    const [dataFeature, setDataFeature] = useState([])
    const [dataHot,setDateHot] = useState([])
    let loadPost = async (limit, offset) => {
        let arrData = await getListPostService({
            limit: limit,
            offset: offset,
            categoryJobCode: '',
            addressCode: '',
            salaryJobCode: '',
            categoryJoblevelCode: '',
            categoryWorktypeCode: '',
            experienceJobCode: '',
            sortName: false
        })
        let arrData2 = await getListPostService({
            limit: limit,
            offset: offset,
            categoryJobCode: '',
            addressCode: '',
            salaryJobCode: '',
            categoryJoblevelCode: '',
            categoryWorktypeCode: '',
            experienceJobCode: '',
            sortName: false,
            isHot: 1
        })
        if (arrData && arrData.errCode === 0) {
            setDataFeature(arrData.data)
        }
        if (arrData2 && arrData2.errCode === 0) {
            setDateHot(arrData2.data)
        }
    }
    useEffect(() => {
        let fetchPost = async () => {
            await loadPost(5, 0)
        }
        fetchPost()
    }, [])
    return (
        <>
            {/* <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="" />
                </div>
            </div>
        </div>
    </div> */}
            {/* <!-- Preloader Start --> */}

            <main>
                {/* <!-- slider Area Start--> */}
                <div class="slider-area ">
                    {/* <!-- Mobile Menu --> */}
                    <div class="slider-active">
                        <div class="single-slider slider-height d-flex align-items-center"
                            style={{
                                backgroundImage: `url("./assets/img/hero/h1_hero.jpg")`
                            }}>
                            <div class="container">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-9 col-md-10">
                                        <div class="hero__caption">
                                            <h1 style={{marginBottom: '40px', textTransform: 'uppercase', fontSize: '70px'}}>Hãy tìm công việc phù hợp với bạn nào!</h1>
                                            <Link to='/job' class="border-btn2 border-btn4" style={{fontSize: '20px', color: '#28395a', fontWeight: 'bold', borderRadius: '5px', border: '1px solid #28395a'}}>Tìm việc ngay</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Search Box --> */}

                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- slider Area End-->
        <!-- Our Services Start --> */}
<section class="featured-job-area feature-padding" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
                    <div class="container-fluid" style={{padding: '0 50px', marginBottom: '100px'}}>
                        <div class="row">
                            {/* Banner bên trái */}
                            <div class="col-lg-2">
                                <div style={{
                                    height: '90vh',
                                    position: 'sticky',
                                    top: '20px',
                                    backgroundImage: 'url("/assets/img/hero/banner3.jpg")', 
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '10px',
                                    marginTop: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    textAlign: 'center',
                                    padding: '20px'
                                }}>
                                </div>
                            </div>

                            {/* Cột chính giữa */}
                            <div class="col-lg-8">
                                <div class="section-tittle text-center">
                                    <h2 style={{ fontSize: '56px', textTransform: 'uppercase' }}>Việc làm tốt nhất</h2>
                                </div>
                                <FeatureJobs dataFeature={dataHot} />
                            </div>

                            {/* Banner bên phải */}
                            <div class="col-lg-2">
                                <div style={{
                                    height: '90vh',
                                    position: 'sticky',
                                    top: '20px',
                                    backgroundImage: 'url("/assets/img/hero/banner2.jpg")', // Thêm ảnh banner của bạn
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '10px',
                                    marginTop: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    textAlign: 'center',
                                    padding: '20px'
                                }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="our-services section-pad-t30" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <div class="container-fluid" style={{padding: '50px 230px 50px 230px'}}>
                        {/* <!-- Section Tittle --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-tittle text-center">
                                    <h2 style={{ fontSize: '56px', textTransform: 'uppercase' }}>Các ngành nghề trọng điểm</h2>
                                </div>
                            </div>
                        </div>
                        <Categories />
                    </div>
                </div>
                <div class="online-cv cv-bg section-overly pt-90 pb-120" style={{
                    backgroundImage: `url("assets/img/gallery/cv_bg.jpg")`
                }}>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-xl-12">
                                <div class="cv-caption text-center">
                                    <p class="pera2" style={{textTransform: 'uppercase'}}> Bạn đã lựa chọn được công việc phù hợp với bản thân chưa?</p>
                                    <Link to='/job' class="border-btn2 border-btn4">Tìm việc ngay</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <section class="featured-job-area feature-padding" style={{ paddingTop: '70px', paddingBottom: '20px' }}>
                    <div class="container">
                        {/* <!-- Section Tittle --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-tittle text-center">

                                    <h2 style={{ fontSize: '56px', textTransform: 'uppercase' }}>Việc làm gần đây</h2>
                                </div>
                            </div>
                        </div>
                        <FeatureJobs dataFeature={dataFeature} />
                    </div>
                </section>

                {/* <!-- Featured_job_end -->
        <!-- How  Apply Process Start--> */}
                <div class="apply-process-area apply-bg pt-150 pb-150" style={{
                    backgroundImage: `url("assets/img/gallery/how-applybg.png")`
                }}>
                    <div class="container">
                        {/* <!-- Section Tittle --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-tittle white-text text-center">
                                    <h2 style={{ fontSize: '56px', textTransform: 'uppercase' }}>Ứng tuyển việc làm tại Job Finder</h2>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Apply Process Caption --> */}
                        <div class="row">
                            <div class="col-lg-4 col-md-6">
                                <div class="single-process text-center mb-30">
                                    <div class="process-ion">
                                        <span class="flaticon-search"></span>
                                    </div>
                                    <div class="process-cap">
                                        <h5>1. Tìm kiếm công việc</h5>

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="single-process text-center mb-30">
                                    <div class="process-ion">
                                        <span class="flaticon-curriculum-vitae"></span>
                                    </div>
                                    <div class="process-cap">
                                        <h5>2. Ứng tuyển công việc</h5>

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="single-process text-center mb-30">
                                    <div class="process-ion">
                                        <span class="flaticon-tour"></span>
                                    </div>
                                    <div class="process-cap">
                                        <h5>3. Nộp CV cá nhân</h5>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </main>
            <Chatbot />
        </>
        
    )
}

export default Home
