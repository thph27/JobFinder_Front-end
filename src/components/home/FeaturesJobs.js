import React from 'react'
import FeatureJob from './FeatureJob'
import { Link } from 'react-router-dom'
import './FeaturesJobs.css'
const FeaturesJobs = (props) => {
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-xl-12">
                    {props.dataFeature.map((data) => {
                        return (
                            <Link to={`/detail-job/${data.id}`} className="job-item">
                                <div className="job-wrapper">
                                    <FeatureJob key={data.id} data={data}/>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default FeaturesJobs
