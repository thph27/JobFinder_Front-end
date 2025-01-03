import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
const FeatureJob = (props) => {
    const handleSplitTime = (time) => {
        return moment(new Date(+time)).fromNow();
    }
    return (
        <>
            <div class="single-job-items" style={{marginBottom: 0}}>
                <div class="job-items">
                    <div class="company-img">
                        <a href="job_details.html"><img src={props.data.userPostData.userCompanyData.thumbnail} alt="" style={{ width: "100px", height: "100px" }} /></a>
                    </div>
                    <div class="job-tittle" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start'}}>
                        <a href="job_details.html"><h4>{props.data.postDetailData.name}</h4></a>
                        <ul>
                            <li>{props.data.postDetailData.jobLevelPostData.value}</li>
                            <li><i class="fas fa-map-marker-alt"></i>{props.data.postDetailData.provincePostData.value}</li>
                            <li> <i class="fas fa-dollar-sign"></i>{props.data.postDetailData.salaryTypePostData.value}</li>
                        </ul>
                    </div>
                </div>
                <div class="items-link items-link2 f-right">
                    <a href="job_details.html">{props.data.postDetailData.workTypePostData.value}</a>
                    <span style={{ position: 'absolute', right: '70px' }}>{handleSplitTime(props.data.timePost)}</span>
                </div>
            </div>
        </>
    )
}

export default FeatureJob
