import React from 'react'
import { Link } from 'react-router-dom'
import Job from '../../../components/Job/Job'
import {Input} from 'antd'
import './RightContent.css'
const RightContent = (props) => {
    return (
        <>
                {/* <!-- Featured_job_start --> */}
                <section class="featured-job-area" style={{paddingTop: '10px', paddingBottom: '20px'}}>
                    <div class="container" style={{marginLeft: '40px'}}>
                        {/* <!-- Count of Job list Start --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="count-job mb-35">
                                    <Input.Search onSearch={props.handleSearch} className='mt-1' placeholder="Nhập tên bài đăng" allowClear enterButton="Tìm kiếm">
                                    </Input.Search>
                                </div>
                            </div>
                        </div>
                        {props.post.map((data, index) => {
                            return (
                                <Link to={`/detail-job/${data.id}`}>
                                    <div class="single-job-items mb-30" >
                                        <Job key={data.id} data={data} />
                                    </div>
                                </Link>
                            )
                        })}

                    </div>
                </section>
                {/* <!-- Featured_job_end --> */}
        </>
    )
}

export default RightContent
