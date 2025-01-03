import React from 'react'
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <>
    <main>
        {/* <!-- Hero Area Start--> */}
        <div class="slider-area ">
        <div class="single-slider section-overly slider-height2 d-flex align-items-center" style={{ 
                    backgroundImage: `url("assets/img/hero/anh3.jpg")` 
                  }}>
        </div>
        </div>
        {/* <!-- Hero Area End --> */}
        {/* <!-- Support Company Start--> */}
        <div class="support-company-area fix section-padding2" style={{paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#f5f5f5'}}>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-6 col-lg-6">
                        <div class="right-caption">
                            {/* <!-- Section Tittle --> */}
                            <div class="section-tittle section-tittle2">
                                <h2 style={{marginBottom: '18px'}}>About Job Finder</h2>
                            </div>
                            <div class="support-caption">
                                <p class="pera-top"  style={{marginBottom: '20px'}}>Chào mừng bạn đến với Job Finder – nền tảng tuyển dụng hàng đầu giúp kết nối ứng viên với hàng ngàn cơ hội việc làm hấp dẫn. Với sứ mệnh xây dựng một cầu nối vững chắc giữa nhà tuyển dụng và những tài năng sáng giá, chúng tôi luôn nỗ lực để mang lại giá trị tối ưu cho cả hai bên.

                                Job Finder không chỉ là nơi tìm kiếm việc làm, mà còn là người bạn đồng hành cùng bạn trên hành trình sự nghiệp. Từ sinh viên mới ra trường đến những chuyên gia dày dạn kinh nghiệm, chúng tôi luôn sẵn sàng hỗ trợ bạn đạt được mục tiêu nghề nghiệp và mở ra những cánh cửa mới.

                                Hãy để Job Finder trở thành nơi khởi đầu cho những cơ hội tuyệt vời và một tương lai đầy cảm hứng!</p>
                  
                                <div style={{ marginBottom: '10px'}}><span style={{fontSize: '24px', color: 'red'}}>Khám phá cơ hội tại Job Finder</span></div>
                                <p>Tại Job Finder, chúng tôi hiểu rằng mỗi người đều có một hành trình nghề nghiệp riêng biệt. Chính vì thế, chúng tôi cung cấp giải pháp tuyển dụng thông minh và hiệu quả, giúp bạn dễ dàng tìm được công việc phù hợp với kỹ năng, đam mê và mục tiêu phát triển của mình.</p>
                                <Link to={'/login'} class="btn post-btn">Tham gia ngay</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="row">
                            <div class="col-md-12 mb-5">
                            <img src="assets/img/hero/anh1.jpg" style={{width: '100%', height: '100%'}} />
                            </div>
                            <div class="col-md-12">
                            <img src="assets/img/hero/anh2.jpg" style={{width: '100%', height: '100%'}} />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Support Company End--> */}
        {/* <!-- How  Apply Process Start--> */}
        <div class="apply-process-area apply-bg pt-100 pb-150" style={{ 
                    backgroundImage: `url("assets/img/gallery/how-applybg.png")` 
                  }}>
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle white-text text-center">
                            <h2 style={{textTransform: 'uppercase', fontSize: '50px'}}> Vì Sao Nên Chọn Job Finder?</h2>
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
                                <h5>Giao Diện Thân Thiện</h5>
                            <p>Được thiết kế để đơn giản hóa quá trình tìm kiếm việc làm.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-curriculum-vitae"></span>
                            </div>
                            <div class="process-cap">
                                <h5>Công Nghệ Kết Nối Tiên Tiến</h5>
                            <p>Thuật toán thông minh giúp ghép nối ứng viên với công việc phù hợp.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="process-cap">
                                <h5>Bảo Mật Thông Tin</h5>
                            <p>Đảm bảo thông tin của bạn được bảo mật và an toàn.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- How  Apply Process End--> */}
        <section class="bg-white dark:bg-gray-900 my-10">
    <div class="container px-6 py-12 mx-auto mt-80 mb-60">
       <div>
        <h1
          class="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white"
        >
          Liên hệ với chúng tôi!
        </h1>
        <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">
            <i class="fa-solid fa-envelope mr-2"></i>
              Email: <span style={{color: 'blue', fontWeight: 'medium', textDecoration: 'underline'}}>jobfindersystems@gmail.com</span>
            </p>
        <p class="mt-3 text-gray-500 dark:text-gray-400">
          Chúng tôi rất mong nhận được phản hồi của bạn để cải thiện dịch vụ của chúng tôi.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
          <div>
          <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">
            <i class="fa-solid fa-phone mr-2"></i>
              Phone: <span style={{color: 'blue', fontWeight: 'medium'}}>0343020702</span>
            </p>
          </div>
          <div>
          <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">
            <i class="fa-solid fa-location-dot mr-2"></i>
              Address: <span style={{color: 'blue', fontWeight: 'medium'}}>Ha Noi, Viet Nam.</span>
            </p>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
            <div style={{width: '100%'}}>
                <iframe width="100%" height="400" frameborder="0" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Hanoi+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            </iframe>
            </div>
        </div>
      </div>
     </div>
    </section>
    </main>
        </>
    )
}
export default About
